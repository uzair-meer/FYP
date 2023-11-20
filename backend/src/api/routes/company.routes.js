import express from 'express'
import {
	deleteEmployee,
	deleteInventory,
	getAllClientBookings,
	getBookingRequests,
	getClientReviews,
	getCompanyEmployees,
	getCompanyFreeEmployees,
	getCompletedBookings,
	getInprogressBooking,
	getLatestInventory,
	postBookingRequest,
	postEmployee,
	postInventory,
	putApproveBookingReq,
	putClientReviews,
	putDeclineBookingReq,
	putEmployee,
	updateInventory,
} from '../controllers/company.controller.js'

const router = express.Router()

router.post(`/add/employee`, postEmployee)
router.put(`/put/employee`, putEmployee)
router.delete(`/delete/employee`, deleteEmployee)
router.get(`/get/employees`, getCompanyEmployees)
router.get(`/get/free/employees`, getCompanyFreeEmployees)

router.put(`/booking/request/approved`, putApproveBookingReq)
router.put(`/booking/request/declined`, putDeclineBookingReq)

router.get(`/client-reviews`, getClientReviews)
router.put(`/client-reviews`, putClientReviews)
router.get(`/client-bookings`, getAllClientBookings)
router.post(`/inventory/update`, updateInventory)
router.post(`/inventory/post`, postInventory)
router.delete(`/inventory/delete`, deleteInventory)
router.get(`/inventory`, getLatestInventory)

router.get(`/booking-requests`, getBookingRequests)
router.post(`/booking-request`, postBookingRequest)
router.get(`/current-bookings`, getInprogressBooking)
router.get(`/completed-bookings`, getCompletedBookings)

export { router as companyRoutes }
