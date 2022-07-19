import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ServiceType {
	Reception = 'RECEPTION',
	Room = 'ROOM',
	Bar = 'BAR',
	Restaurant = 'RESTAURANT',
	ConferenceRoom = 'CONFERENCE',
	Gym = 'GYM',
	Sauna = 'SAUNA',
	HairSalon = 'HAIR_SALON'
}

@Entity('services')
export class Service extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'service_id', type: 'int' })
	serviceId: number;

	@Column({
		name: 'service_type',
		type: 'enum',
		enum: ServiceType,
		default: ServiceType.Room
	})
	serviceType: ServiceType;
}
