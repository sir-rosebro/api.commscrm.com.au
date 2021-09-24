// routes/customer.js
import express from "express";
import { customerController } from "../controllers";
import { authController } from "../controllers";

const router = express.Router();

const {signIn} = authController;
const { create } = customerController;

router.post("/auth/sign-up", create);
router.post("/auth/signin", signIn);

export default router;