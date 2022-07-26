import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Customer } from './Customer';
import { Place } from './Place';

@Entity('visit_log')
export class Visit extends BaseEntity {
	@PrimaryGeneratedColumn('uuid', { name: 'v_log_id' })
	visitLogId: string;

	@ManyToOne(() => Customer, (customer) => customer.visits, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@ManyToOne(() => Place, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'place_id' })
	place: Place;

	@Column({ name: 'timestamp_in', type: 'datetime' })
	timestampIn: Date;

	@Column({ name: 'timestamp_out', type: 'datetime', nullable: true })
	timestampOut: Date;
}
