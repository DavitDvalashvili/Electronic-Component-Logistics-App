import express from "express";
import { getDevices } from "../controllers/component.device.controller.js";

const router = express.Router();

router.get("/get/:id", getDevices);

export default router;
