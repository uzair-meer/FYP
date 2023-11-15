import express from 'express'
import {
	// registerCompany,
	login,
	registerUser,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post(`/register/user`, registerUser)
// router.post(`/register/company`, registerCompany); //we dont need that

router.post(`/login`, login)

export { router as authRoutes }
