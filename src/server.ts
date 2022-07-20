import { appDataSource, server } from './config/config';
import { Customer } from './entities/Customer';

import express from 'express';
import { Enrollment } from './entities/Enrollment';
import { ServiceType } from './entities/Service';
import { RegisterService } from './entities/RegisterService';

appDataSource
	.initialize()
	.then(async () => {
		let customer: Customer = await appDataSource.getRepository(Customer).findOneOrFail({
			where: {
				nfcId: '5793cfb2-a984-408b-b0de-6cf32c4a3921'
			}
		});

		let enroll = appDataSource.getRepository(Enrollment).create({
			enrollmentId: undefined,
			customer: customer,
			enrollDateTime: new Date(),
			service: await appDataSource
				.getRepository(RegisterService)
				.findOneOrFail({ where: { serviceType: ServiceType.Room } }),
		});


		console.log('=======');
		await enroll.save();

		console.log('=======');
		
		enroll = appDataSource.getRepository(Enrollment).create({
			enrollmentId: undefined,
			customer: customer,
			enrollDateTime: new Date(),
			service: await appDataSource
				.getRepository(RegisterService)
				.findOneOrFail({ where: { serviceType: ServiceType.Sauna } }),
		});

		console.log('=======');
		await enroll.save();

		console.log('=======');
		let app = express();

		app.get('/customers', async (req, res) => {
			let customers = await Customer.find();
			res.status(200).json({ customers });
		});

		app.listen(server.port, () => console.log('listening...'));
	})
	.catch((error) => console.log(error));
