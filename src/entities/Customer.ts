import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany
} from 'typeorm';
import { Access } from './Access';
import { CustomerEmail } from './CustomerEmail';
import { CustomerPhone } from './CustomerPhone';
import { Enrollment } from './Enrollment';
import { ServiceUse } from './ServiceUse';
import { Visit } from './Visit';

export enum CustomerGender {
	Male = 'MALE',
	Female = 'FEMALE',
	NonBinary = 'NON-BINARY'
}

export enum CustomerVerificationIdType {
	Id = 'ID',
	Passport = 'PASSPORT'
}

@Entity('customers')
export class Customer extends BaseEntity {
	populateCustomer(
		firstName: string,
		lastName: string,
		gender: CustomerGender,
		dateOfBirth: Date,
		verifId: string,
		verifIdType: CustomerVerificationIdType,
		verifDate: Date
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.verifId = verifId;
		this.verifIdType = verifIdType;
		this.verifDate = verifDate;
	}

	@PrimaryGeneratedColumn('uuid', { name: 'nfc_id' })
	nfcId: string;

	@Column({ name: 'first_name' })
	firstName: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column({
		name: 'gender',
		type: 'enum',
		enum: CustomerGender,
		default: CustomerGender.Male
	})
	gender: CustomerGender;

	@Column({ name: 'date_of_birth', type: 'date' })
	dateOfBirth: Date;

	@Column({ name: 'verif_id', unique: true })
	verifId: string;

	@Column({
		name: 'verif_id_type',
		type: 'enum',
		enum: CustomerVerificationIdType,
		default: CustomerVerificationIdType.Id
	})
	verifIdType: CustomerVerificationIdType;

	@Column({ name: 'verif_date', type: 'date' })
	verifDate: Date;

	@OneToMany(() => CustomerPhone, (phone) => phone.customer)
	phones: CustomerPhone[];

	@OneToMany(() => CustomerEmail, (email) => email.customer)
	emails: CustomerEmail[];

	@OneToMany(() => Enrollment, (enrollment) => enrollment.customer)
	enrollments: Enrollment[];

	@OneToMany(() => Access, (access) => access.customer)
	accesses: Access[];

	@OneToMany(() => Visit, (visit) => visit.customer)
	visits: Visit[];

	@OneToMany(() => ServiceUse, (use) => use.customer)
	uses: ServiceUse[];
}
