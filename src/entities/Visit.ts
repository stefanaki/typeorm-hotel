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
	@PrimaryGeneratedColumn('rowid')
	v_log_id: number;

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

	@Column({ type: 'datetime' })
	timestamp_in: Date;

	@Column({ type: 'datetime', nullable: true })
	timestamp_out: Date;
}
