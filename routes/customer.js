// routes/customer.js
import express from "express";
import { customerController } from "../controllers";
import {shouldLoggedIn, adminOnly} from '../middlewares/auth';

const router = express.Router();


const { getCustomers, approveCustomer } = customerController;

router.get("/all", getCustomers);
router.get("/approve-customer/:id",[shouldLoggedIn, adminOnly], approveCustomer);

export default router;