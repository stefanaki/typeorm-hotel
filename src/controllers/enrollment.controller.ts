import { Request, Response } from "express";
import { Customer } from "../entities/Customer";
import { Enrollment } from "../entities/Enrollment";
import { Equal } from 'typeorm';

export const getAllEnrollments = async (req: Request, res: Response) => {
    let enrollments = await Enrollment.find();

    res.status(200).json(enrollments);
}

export const getEnrollmentsByCustomer = async (req: Request, res: Response) => {
	try {
		let customerId = req.params.id;

		let enrollments = await Enrollment.findBy({
			customer: Equal(await Customer.findOneByOrFail({ verifId: customerId }))
		});

		res.json(enrollments);
	} catch (error) {
		res.status(404).json({
			message: 'An error occured',
			error: error
		});
	}
}