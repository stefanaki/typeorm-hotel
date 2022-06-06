import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from 'typeorm';
import { Service } from './Service';

export enum PlaceType {
	Floor = 'FLOOR',
	Corridor = 'CORRIDOR',
	Elevator = 'ELEVATOR',
	Service = 'SERVICE'
}

@Entity('places')
export class Place extends BaseEntity {
	@PrimaryColumn()
	place_id: number;

	@Column({ type: 'varchar', precision: 5 })
	place_description: string;

	@Column({ type: 'enum', enum: PlaceType })
	place_type: PlaceType;

	@ManyToOne(() => Place, (place) => place.floor, {
		nullable: true,
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'floor_id' })
	floor: Place;

	@ManyToOne(() => Place, (place) => place.corridor, {
		nullable: true,
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'corridor_id' })
	corridor: Place;

	@ManyToOne(() => Service, {
		nullable: true,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'offered_service_id' })
	offered_service: Service;

	@Column({ type: 'int' })
	room_capacity: number;
}
