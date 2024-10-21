import express from "express";

import {
  uploadImage as uploadImagesController,
  uploadPDF as uploadPDFController,
  addImages,
  deleteImage,
} from "../controllers/file.controller.js";
import {
  uploadImage as uploadImageMiddleware,
  uploadPDF as uploadPDFMiddleware,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/file/uploadImage", uploadImageMiddleware, uploadImagesController);
router.post("/file/uploadPDF", uploadPDFMiddleware, uploadPDFController);
router.put("/file/addImages", addImages);
router.delete("/file/deleteImage/:id", deleteImage);

export default router;
