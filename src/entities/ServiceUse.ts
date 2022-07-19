import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Customer } from './Customer';
import { Service } from './Service';

@Entity('use_charge_log')
export class ServiceUse extends BaseEntity {
	@PrimaryGeneratedColumn('rowid', {name: 'use_log_id'})
	useLogId: number;

	@ManyToOne(() => Customer, (customer) => customer.uses, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@ManyToOne(() => Service, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'service_id' })
	service: Service;

	@Column({ name: 'use_date_time', type: 'datetime' })
	useDateTime: Date;

	@Column({ name: 'charge_amount', type: 'numeric', precision: 10, scale: 2 })
	chargeAmount: number;

	@Column({ name: 'paid', type: 'tinyint', default: false })
	paid: boolean;

	@Column({ name: 'description', type: 'varchar', nullable: true })
	description: string;
}
