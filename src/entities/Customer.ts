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
	@PrimaryGeneratedColumn('uuid')
	nfc_id: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({
		type: 'enum',
		enum: CustomerGender,
		default: CustomerGender.Male
	})
	gender: CustomerGender;

	@Column({ type: 'date' })
	date_of_birth: string;

	@Column({ unique: true })
	verif_id: string;

	@Column({
		type: 'enum',
		enum: CustomerVerificationIdType,
		default: CustomerVerificationIdType.Id
	})
	verif_id_type: CustomerVerificationIdType;

	@Column({ type: 'date' })
	verif_date: string;

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
