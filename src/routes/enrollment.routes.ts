import { Router } from "express";
import { getAllEnrollments, getEnrollmentsByCustomer } from "../controllers/enrollment.controller";

const router = Router();

router.get('/', getAllEnrollments);
router.get('/:id', getEnrollmentsByCustomer);

export default router;