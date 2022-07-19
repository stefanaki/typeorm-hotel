import {
	Entity
} from 'typeorm';
import { Service } from './Service';

@Entity('no_register_services')
export class NoRegisterService extends Service {
}
