import express from "express";
import {
  getDevices,
  getComponents,
  getComponentNames,
  addComponentDevice,
  DeleteComponentDevice,
} from "../controllers/component.device.controller.js";

const router = express.Router();

router.get("/device/:id", getComponents);
router.get("/component/:id", getDevices);
router.get("/component-names", getComponentNames);
router.post("/add", addComponentDevice);
router.delete("/delete/:id", DeleteComponentDevice);

export default router;
