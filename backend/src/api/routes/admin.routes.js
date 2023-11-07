import express from "express";
import {
  createService,
  getAllServices,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("admin/create/service", createService);
router.get("get/services", getAllServices);

export { router as adminRoutes };
