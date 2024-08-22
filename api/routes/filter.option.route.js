import express from "express";
import { getFilterOptions } from "../controllers/filter.option.controller.js";

const router = express.Router();

router.get("/get", getFilterOptions);

export default router;
