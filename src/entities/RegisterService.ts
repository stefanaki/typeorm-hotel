import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Service } from './Service';

@Entity('register_services')
export class RegisterService extends BaseEntity {
	@PrimaryGeneratedColumn('rowid')
	reg_service_id: number;

	@OneToOne(() => Service, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({ name: 'service_id' })
	service: Service;

	@Column()
	enroll_price: number;
}
