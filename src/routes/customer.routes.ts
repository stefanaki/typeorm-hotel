import { Router } from "express";
import { getAllCustomers, getCustomerInfo } from "../controllers/customer.controller";

const router = Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerInfo);

export default router;