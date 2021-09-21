// routes/customer.js
import express from "express";
import { customerController } from "../controllers";

const router = express.Router();

const { create } = customerController;

router.post("/", create);

export default router;