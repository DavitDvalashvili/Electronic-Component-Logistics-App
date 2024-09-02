import express from "express";

import {
  uploadImage as uploadImagesController,
  uploadPDF as uploadPDFController,
} from "../controllers/upload.controller.js";
import {
  uploadImage as uploadImageMiddleware,
  uploadPDF as uploadPDFMiddleware,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/uploadImage", uploadImageMiddleware, uploadImagesController);
router.post("/uploadPDF", uploadPDFMiddleware, uploadPDFController);

export default router;
