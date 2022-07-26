import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
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
	@PrimaryGeneratedColumn('increment', { name: 'place_id' })
	placeId: number;

	@Column({ name: 'place_description', type: 'varchar', precision: 5 })
	placeDescription: string;

	@Column({ name: 'place_type', type: 'enum', enum: PlaceType })
	placeType: PlaceType;

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
	offeredService: Service;

	@Column({ name: 'room_capacity', type: 'int', nullable: true })
	roomCapacity: number;
}
