import express from "express";
import { authController, excelController } from "../controllers";

const router = express.Router();

const {signIn, signUp, forgotPassword, resetPassword} = authController;
const { download } = excelController;

router.get("/download", download);

export default router;