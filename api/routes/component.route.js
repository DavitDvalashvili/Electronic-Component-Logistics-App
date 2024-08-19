import express from "express";
import {
  getComponents,
  getComponent,
  addComponent,
  deleteComponent,
  updateComponent,
} from "../controllers/components.controller.js";

const router = express.Router();

router.get("/get", getComponents);
router.get("/get/:id", getComponent);
router.post("/add", addComponent);
router.delete("/delete/:id", deleteComponent);
router.put("/update/:id", updateComponent);

export default router;
