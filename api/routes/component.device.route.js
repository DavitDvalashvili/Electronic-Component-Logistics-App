import express from "express";
import {
  getDevices,
  getComponents,
  getComponentNames,
  addComponentToDevice,
} from "../controllers/component.device.controller.js";

const router = express.Router();

router.get("/device/:id", getComponents);
router.get("/component/:id", getDevices);
router.get("/component-names", getComponentNames);
router.post("/add-component-device/:device_id", addComponentToDevice);

export default router;
