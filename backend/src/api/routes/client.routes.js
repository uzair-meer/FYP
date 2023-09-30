import express from 'express'
import { postBooking } from '../controllers/client.controller.js'

const router = express.Router()

const route = "/client"

router.post(`${route}/booking`, postBooking)

export { router as clientRoutes }
