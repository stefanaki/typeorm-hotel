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

@Entity('have_access')
export class Access extends BaseEntity {
	@PrimaryGeneratedColumn('rowid')
	access_id: number;

	@ManyToOne(() => Customer, (customer) => customer.accesses, {
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
	start_date_time: Date;

	@Column({ type: 'datetime', nullable: true })
	end_date_time: Date;
}
