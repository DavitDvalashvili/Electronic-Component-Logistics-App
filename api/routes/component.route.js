import express from "express";
import {
  getComponents,
  getComponent,
} from "../controllers/components.controller.js";

const router = express.Router();

router.get("/get", getComponents);
router.get("/get/:id", getComponent);

export default router;
