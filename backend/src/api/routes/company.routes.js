import express from "express";
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
  getInprogressBooking,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post(`/employee`, postEmployee);
router.delete(`/employee`, deleteEmployee);
router.put(`/employee`, putEmployee);
router.get(`/client-reviews`, getClientReviews);
router.put(`/client-reviews`, putClientReviews);
router.get(`/client-bookings`, getAllClientBookings);
router.post(`/product`, postProduct);
router.get(`/booking-requests`, getBookingRequests);
router.post(`/booking-request`, postBookingRequest);
router.get(`/current-bookings`, getInprogressBooking);

export { router as companyRoutes };
