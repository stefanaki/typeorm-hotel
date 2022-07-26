import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';
import { Customer } from './Customer';

@Entity('customer_emails')
export class CustomerEmail extends BaseEntity {
	@PrimaryColumn({ name: 'email' })
	email: string;

	@ManyToOne(() => Customer, (customer) => customer.emails, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;
}
