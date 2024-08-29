import express from "express";
import {
  getDevices,
  getDevice,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller.js";

const router = express.Router();

router.get("/get", getDevices);
router.get("/get/:id", getDevice);
router.post("/add", addDevice);
router.put("/update/:id", updateDevice);
router.delete("/delete/:id", deleteDevice);

export default router;
