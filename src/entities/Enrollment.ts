import { appDataSource } from '../config/config';
import {
	AfterInsert,
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Access } from './Access';
import { Customer } from './Customer';
import { Place, PlaceType } from './Place';
import { RegisterService } from './RegisterService';
import { ServiceType } from './Service';

@Entity('enroll_in')
export class Enrollment extends BaseEntity {
	@PrimaryGeneratedColumn('uuid', { name: 'enrollment_id' })
	enrollmentId: string;

	@Column({ name: 'enroll_date_time', type: 'timestamp' })
	enrollDateTime: Date;

	@ManyToOne(() => Customer, (customer) => customer.enrollments, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@ManyToOne(() => RegisterService, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'service_id' })
	service: RegisterService;

	@AfterInsert() async setRoomAccesses() {
		let placeAccesses: Place[] = [];
		const placeRepo = appDataSource.getRepository(Place);
		const accessRepo = appDataSource.getRepository(Access);

		if (this.service.serviceType === ServiceType.Room) {
			/* When enrollment refers to new room booking, the
			 * customer is given access to all shared places
			 * (corridors, elevators, reception,
			 * bars, restaurants, hair salon)
			 */
			let sharedPlaces = await placeRepo.find({
				where: [
					{
						placeType: PlaceType.Corridor
					},
					{
						placeType: PlaceType.Elevator
					},
					{
						offeredService: { serviceType: ServiceType.Reception }
					},
					{
						offeredService: { serviceType: ServiceType.Bar }
					},
					{
						offeredService: { serviceType: ServiceType.Restaurant }
					},
					{
						offeredService: { serviceType: ServiceType.HairSalon }
					}
				]
			});

			placeAccesses.push(...sharedPlaces);
		} else {
			/* On new service enrollment, the customer is
			 * given access on the places that host the service
			 */
			let serviceAccesses = await placeRepo.find({
				where: [
					{
						offeredService: { serviceType: this.service.serviceType }
					}
				]
			});

			placeAccesses.push(...serviceAccesses);
		}

		/* Save new accesses */
		for (let p of placeAccesses) {
			let newAccess = accessRepo.create({
				customer: this.customer,
				place: p,
				startDateTime: this.enrollDateTime
			});
			await newAccess.save();
		}

		console.log(`Customer ${this.customer.firstName} ${this.customer.lastName} new accesses have been saved!`);
		console.log(this.customer.accesses);
	}
}
