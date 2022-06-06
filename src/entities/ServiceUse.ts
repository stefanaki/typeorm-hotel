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
	@PrimaryGeneratedColumn('rowid')
	use_log_id: number;

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

	@Column({ type: 'datetime' })
	use_date_time: Date;

	@Column({ type: 'numeric', precision: 10, scale: 2 })
	charge_amount: number;

	@Column({ type: 'tinyint', default: false })
	paid: boolean;

	@Column({ type: 'varchar', nullable: true })
	description: string;
}
