import express from 'express'
import { postLogin } from '../controllers/auth.controller.js'

const router = express.Router()

const route = '/auth'

router.post(`${route}/login`, postLogin)

export { router as authRoutes }

