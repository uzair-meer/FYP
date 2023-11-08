import express from "express";
import { getAllCompanies } from "../controllers/admin.controller.js";

const router = express.Router();
router.get("/get/companies", getAllCompanies);
export { router as adminRoutes };
