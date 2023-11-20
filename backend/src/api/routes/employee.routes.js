import express from 'express'
import {
	getCurrentEmployeeBooking,
	getEmployeeBookings,
	putBookingStatus,
} from '../controllers/employee.controller.js'

const router = express.Router()

router.get('/bookings', getEmployeeBookings)
router.get('/booking/current', getCurrentEmployeeBooking)
router.put('/booking/update/status', putBookingStatus)

export { router as employeeRoutes }
