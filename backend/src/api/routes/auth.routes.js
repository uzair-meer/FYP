import express from "express";
import {
  // registerCompany,
  login,
  registerUser,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(`/register/user`, registerUser);
// router.post(`/register/company`, registerCompany); //we dont need that

router.patch("/update/:userId", updateProfile);

router.post(`/login`, login);

export { router as authRoutes };
