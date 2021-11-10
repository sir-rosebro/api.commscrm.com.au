// routes/customer.js
import express from "express";
import { customerController } from "../controllers";
import {shouldLoggedIn, adminOnly} from '../middlewares/auth';

const router = express.Router();


const { 
    getCustomers, 
    approveCustomer,
    deleteCustomer,
    update 
} = customerController;

router.get("/all", getCustomers);
router.put("/approve-customer/:id",[shouldLoggedIn, adminOnly], approveCustomer);
router.delete("/:id",[shouldLoggedIn, adminOnly], deleteCustomer);
router.put("/update/:id", [shouldLoggedIn, adminOnly], update);
export default router;