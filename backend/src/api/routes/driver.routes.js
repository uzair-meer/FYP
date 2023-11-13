import express from "express";
import {
  getEmployeeBookings,
  getLatestEmployeeBooking,
} from "../controllers/driver.controller.js";

const router = express.Router();

router.get("/bookings", getEmployeeBookings);
router.get("/booking", getLatestEmployeeBooking);

export { router as driverRoutes };
