// routes/customer.js
import express from "express";
import { customerController } from "../controllers";
import { authController } from "../controllers";

const router = express.Router();

const {signIn, forgotPassword, resetPassword} = authController;
const { create } = customerController;

router.post("/auth/sign-up", create);
router.post("/auth/signin", signIn);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

export default router;