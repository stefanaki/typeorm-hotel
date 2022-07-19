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
	@PrimaryGeneratedColumn('rowid', { name: 'enrollment_id' })
	enrollmentId: number;

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
}
