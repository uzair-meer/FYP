import express from 'express'
import { getBookings } from '../controllers/booking.controller.js'

const router = express.Router()

router.get(`/all`, getBookings)

export { router as bookingRoutes }
