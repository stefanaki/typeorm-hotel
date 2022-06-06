import {
	AfterInsert,
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Customer } from './Customer';
import { RegisterService } from './RegisterService';

@Entity('enroll_in')
export class Enrollment extends BaseEntity {
	@PrimaryGeneratedColumn('rowid')
	enrollment_id: number;

	@Column({ type: 'numeric', precision: 8, scale: 2 })
	enroll_price: number;

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

	@AfterInsert()
	async giveRoomAccess() {}
}
