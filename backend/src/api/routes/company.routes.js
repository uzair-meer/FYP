import express from 'express'
import {
	deleteEmployee,
	getAllClientBookings,
	getClientReviews,
	postEmployee,
	postProduct,
	putClientReviews,
	putEmployee,
	getBookingRequests,
	postBookingRequest,
	getInprogressBooking
} from '../controllers/company.controller.js'

const router = express.Router()

const route = '/company'

router.post(`${route}/employee`, postEmployee)
router.delete(`${route}/employee`, deleteEmployee)
router.put(`${route}/employee`, putEmployee)
router.get(`${route}/client-reviews`, getClientReviews)
router.put(`${route}/client-reviews`, putClientReviews)
router.get(`${route}/client-bookings`, getAllClientBookings)
router.post(`${route}/product`, postProduct)
router.get(`${route}/booking-requests`, getBookingRequests)
router.post(`${route}/booking-request`, postBookingRequest)
router.get(`${route}/current-bookings`, getInprogressBooking)

export { router as companyRoutes }
