import express from "express";
import {
  getDevices,
  getComponents,
} from "../controllers/component.device.controller.js";

const router = express.Router();

router.get("/device/:id", getComponents);
router.get("/component/:id", getDevices);

export default router;
