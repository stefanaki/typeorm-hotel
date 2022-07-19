import { Column, Entity } from 'typeorm';
import { Service } from './Service';

@Entity('register_services')
export class RegisterService extends Service {
	@Column({ name: 'enroll_price', nullable: false })
	enrollPrice: number;
}
