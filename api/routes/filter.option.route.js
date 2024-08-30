import express from "express";
import {
  getDeviceFilterOptions,
  getComponentFilterOptions,
} from "../controllers/filter.option.controller.js";

const router = express.Router();

router.get("/component", getComponentFilterOptions);
router.get("/device", getDeviceFilterOptions);

export default router;
