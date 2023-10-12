import express from "express";
import { postLogin, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post(`/register`, registerUser);

router.post(`/login`, postLogin);

export { router as authRoutes };
