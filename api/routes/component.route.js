import express from "express";
import { getComponents } from "../controllers/components.controller.js";

const router = express.Router();

router.get("/get", getComponents);

export default router;
