import express from "express";
import {
  deleteEmployee,
  getAllClientBookings,
  getClientReviews,
  postProduct,
  putClientReviews,
  getBookingRequests,
  postBookingRequest,
  getInprogressBooking,
  getLatestInventory,
  postEmployee,
  getCompanyEmployees,
  getCompanyFreeEmployees,
  assignEmployeesToBooking,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post(`/add/employee`, postEmployee);
router.delete(`/employee`, deleteEmployee);
router.get(`/get/employees`, getCompanyEmployees);
router.get(`/get/free/employees`, getCompanyFreeEmployees);
router.post(`/assign/employees`, assignEmployeesToBooking); //FIXME: its name should handle client requests

router.get(`/client-reviews`, getClientReviews);
router.put(`/client-reviews`, putClientReviews);
router.get(`/client-bookings`, getAllClientBookings);
router.post(`/product`, postProduct);
router.get(`/inventory`, getLatestInventory);

router.get(`/booking-requests`, getBookingRequests);
router.post(`/booking-request`, postBookingRequest);
router.get(`/current-bookings`, getInprogressBooking);

export { router as companyRoutes };
