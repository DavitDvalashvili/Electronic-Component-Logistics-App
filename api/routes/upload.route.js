import express from "express";

import {
  uploadImage as uploadImagesController,
  uploadPDF as uploadPDFController,
  addImages,
  deleteImage,
} from "../controllers/upload.controller.js";
import {
  uploadImage as uploadImageMiddleware,
  uploadPDF as uploadPDFMiddleware,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/uploadImage", uploadImageMiddleware, uploadImagesController);
router.post("/uploadPDF", uploadPDFMiddleware, uploadPDFController);
router.put("/addImages", addImages);
router.delete("/delete/:id", deleteImage);

export default router;
