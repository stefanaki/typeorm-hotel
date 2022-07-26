import { Request, Response } from 'express';
import { Customer } from '../entities/Customer';
import { Equal } from 'typeorm';
import { CustomerPhone } from '../entities/CustomerPhone';
import { CustomerEmail } from '../entities/CustomerEmail';

export const getAllCustomers = async (req: Request, res: Response) => {
	let customers = await Customer.find();
	res.status(200).json({ customers });
};

export const getCustomerInfo = async (req: Request, res: Response) => {
	try {
		let customerId = req.params.id;
		let customer = await Customer.findOneByOrFail({
			verifId: customerId
		});

        let customerPhones = (await CustomerPhone.findBy({
           customer: Equal(customer) 
        })).map(p => p.phoneNum);

        let customerEmails = (await CustomerEmail.findBy({
            customer: Equal(customer)
        })).map(e => e.email);

		res.json({
            customer,
            customerPhones,
            customerEmails
        });
	} catch (error) {
		res.status(404).json({
			message: 'An error occured',
			error: error
		});
	}
};