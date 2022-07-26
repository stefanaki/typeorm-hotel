import { appDataSource, server } from './config/config';
import customerRouter from './routes/customer.routes';
import enrollmentRouter from './routes/enrollment.routes'

import express from 'express';
// import { Enrollment } from './entities/Enrollment';
// import { ServiceType } from './entities/Service';
// import { RegisterService } from './entities/RegisterService';
// import { parse } from 'date-fns';

appDataSource
	.initialize()
	.then(async () => {
		// let customer: Customer = await appDataSource.getRepository(Customer).findOneOrFail({
		// 	where: {
		// 		nfcId: '5793cfb2-a984-408b-b0de-6cf32c4a3921'
		// 	}
		// });

		// let enroll = appDataSource.getRepository(Enrollment).create({
		// 	enrollmentId: undefined,
		// 	customer: customer,
		// 	enrollDateTime: new Date(),
		// 	service: await appDataSource
		// 		.getRepository(RegisterService)
		// 		.findOneOrFail({ where: { serviceType: ServiceType.Room } }),
		// });


		// console.log('=======');
		// await enroll.save();

		// console.log('=======');
		
		// enroll = appDataSource.getRepository(Enrollment).create({
		// 	enrollmentId: undefined,
		// 	customer: customer,
		// 	enrollDateTime: new Date(),
		// 	service: await appDataSource
		// 		.getRepository(RegisterService)
		// 		.findOneOrFail({ where: { serviceType: ServiceType.Sauna } }),
		// });

		// console.log('=======');
		// await enroll.save();

		// console.log('=======');

		// let ccc = appDataSource.getRepository(Customer).create({
		// 	firstName: 'Gio',
		// 	lastName: 'Stf',
		// 	dateOfBirth: parse('16/07/1999', 'dd/MM/yyyy', new Date()),
		// 	gender: CustomerGender.NonBinary,
		// 	verifId: 'aaaaaaa',
		// 	verifIdType: CustomerVerificationIdType.Passport,
		// 	verifDate: parse('16/07/2009', 'dd/MM/yyyy', new Date())
		// });
		// await ccc.save();
		console.log('OK')
		let app = express();

		app.use('/customer', customerRouter);
		app.use('/enrollment', enrollmentRouter);

		app.listen(server.port, () => console.log('listening...'));
	})
	.catch((error) => console.log(error));
