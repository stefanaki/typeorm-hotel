import a from 'reflect-metadata';
import { appDataSource, server } from './config/config';
import {
	Customer,
	CustomerGender,
	CustomerVerificationIdType
} from './entities/Customer';

import { parse } from 'csv-parse';
import fs from 'fs';
import { parse as dateparse } from 'date-fns';

import express from 'express';
import { CustomerPhone } from './entities/CustomerPhone';
import { CustomerEmail } from './entities/CustomerEmail';

appDataSource
	.initialize()
	.then(async () => {
		let app = express();

		app.get('/customers', async (req, res) => {
			let customers = await Customer.find();
			res.status(200).json({ customers });
		});

		app.listen(server.port, () => console.log('listening...'));
	})
	.catch((error) => console.log(error));
