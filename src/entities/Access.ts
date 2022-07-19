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
	@PrimaryGeneratedColumn('rowid', { name: 'access_id' })
	accessId: number;

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

	@Column({ name: 'start_date_time', type: 'datetime' })
	startDateTime: Date;

	@Column({ name: 'end_date_time', type: 'datetime', nullable: true })
	endDateTime: Date;
}
