import express from "express";
import {
  registerUser,
  registerCompany,
  login,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(`/register/user`, registerUser);
router.post(`/register/company`, registerCompany);

router.post(`/login`, login);

export { router as authRoutes };
