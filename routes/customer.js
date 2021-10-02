// routes/customer.js
import express from "express";
import { customerController } from "../controllers";

const router = express.Router();


const { getCustomers } = customerController;

router.get("/all", getCustomers);

export default router;