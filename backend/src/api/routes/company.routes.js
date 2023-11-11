import express from "express";
import {
  deleteEmployee,
  getAllClientBookings,
  getClientReviews,
  postProduct,
  putClientReviews,
  putEmployee,
  getBookingRequests,
  postBookingRequest,
  getInprogressBooking,
  getLatestInventory,
  addEmployee,
  getCompanyEmployees,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post(`/employee`, addEmployee);
router.delete(`/employee`, deleteEmployee);
router.put(`/employee`, putEmployee);
router.get(`/get/employees`, getCompanyEmployees);

router.get(`/client-reviews`, getClientReviews);
router.put(`/client-reviews`, putClientReviews);
router.get(`/client-bookings`, getAllClientBookings);
router.post(`/product`, postProduct);
router.get(`/inventory`, getLatestInventory);

router.get(`/booking-requests`, getBookingRequests);
router.post(`/booking-request`, postBookingRequest);
router.get(`/current-bookings`, getInprogressBooking);

export { router as companyRoutes };
