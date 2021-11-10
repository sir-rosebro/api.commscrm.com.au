// import express from "express";
// import { fileUploadController } from "../controllers";
// import {shouldLoggedIn, adminOnly} from '../middlewares/auth';
// import upload from '../middlewares/upload';
// const router = express.Router();

// const { uploadFile } = fileUploadController;



// router.post("/", upload.single("file"), uploadFile);

// export default router;

import express from 'express';
import { fileController } from '../controllers';
import { shouldLoggedIn } from '../middlewares/auth';
const router = express.Router();

const {
  add,
  upload,
} = fileController;

router.post('/', [shouldLoggedIn, upload.single('file')], add);

module.exports = router;
