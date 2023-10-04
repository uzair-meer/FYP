import express from 'express'
import {
	deleteEmployee,
	getAllClientBookings,
	getClientReviews,
	postEmployee,
	postProduct,
	putClientReviews,
	putEmployee,
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

export { router as companyRoutes }
