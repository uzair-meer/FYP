import express from "express";
import {
  createService,
  getAllServices,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("admin/create/service", createService);
router.post("admin/get/services", getAllServices);
router.post("admin/delete/service:id", getAllServices);

export { router as adminRoutes };
