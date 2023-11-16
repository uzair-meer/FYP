import Booking from "../models/Booking.model.js";
import mongoose from "mongoose";

export async function getEmployeeBookings(req, res, next) {
  const employeeId = req.query.driverId; // Adjust according to your authentication setup
  console.log(employeeId);
  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    // Convert employeeId to ObjectId
    const driverId = new mongoose.Types.ObjectId(employeeId);
    const bookings = await Booking.find({
      employees: driverId,
    });
    // No need for projection as we need most of the fields

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching bookings for the employee" });
  }
}
export async function getLatestEmployeeBooking(req, res, next) {
  const employeeId = req.query.employeeId; // Or use authentication to get this ID

  try {
    // Ensure employeeId is valid
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const objectId = new mongoose.Types.ObjectId(employeeId);

    const latestBooking = await Booking.findOne({
      employees: objectId,
    })
      .sort({ createdAt: -1 }) // Sort by creation date, latest first
      .exec();

    if (!latestBooking) {
      return res
        .status(404)
        .json({ message: "No bookings found for this employee" });
    }

    res.status(200).json(latestBooking);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching the latest booking for the employee" });
  }
}
