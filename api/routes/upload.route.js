import express from "express";

import { uploadFiles } from "../controllers/upload.controller.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload, uploadFiles);

export default router;
