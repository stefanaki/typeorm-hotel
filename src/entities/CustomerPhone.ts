import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';
import { Customer } from './Customer';

@Entity('customer_phones')
export class CustomerPhone extends BaseEntity {
	constructor(phone: string) {
		super();
		this.phone_num = phone;
	}

	@PrimaryColumn()
	phone_num: string;

	@ManyToOne(() => Customer, (customer) => customer.phones, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;
}
