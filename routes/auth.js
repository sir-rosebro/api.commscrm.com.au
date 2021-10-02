// routes/customer.js
import express from "express";
import { customerController } from "../controllers";
import { authController } from "../controllers";

const router = express.Router();

const {signIn, signUp, forgotPassword, resetPassword} = authController;
const { create } = customerController;

router.post("/sign-up", signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;