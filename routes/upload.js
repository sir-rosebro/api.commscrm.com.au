
import express from "express";

import { fileUploadController } from "../controllers";
import {shouldLoggedIn, adminOnly} from '../middlewares/auth';
import upload from '../middlewares/upload';
const router = express.Router();

const { uploadFile } = fileUploadController;



router.post("/", upload.single("file"), uploadFile);

export default router;