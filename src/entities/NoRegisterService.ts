import {
	BaseEntity,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Service } from './Service';

@Entity('no_register_services')
export class NoRegisterService extends BaseEntity {
	@PrimaryGeneratedColumn('rowid')
	no_reg_service_id: number;

	@OneToOne(() => Service, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'service_id' })
	service: number;
}
