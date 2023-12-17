import mongoose from "mongoose";
import Booking from "../models/Booking.model.js";
import Employee from "../models/Employee.model.js";

// export async function getEmployeeBookings(req, res, next) {
//   const employeeId = req.query.employeeId; // Adjust according to your authentication setup
//   console.log(employeeId);
//   try {
//     if (!mongoose.Types.ObjectId.isValid(employeeId)) {
//       return res.status(400).json({ message: "Invalid employee ID" });
//     }

//     // Convert employeeId to ObjectId
//     const driverId = new mongoose.Types.ObjectId(employeeId);
//     const bookings = await Booking.find({
//       employees: driverId,
//     });
//     // No need for projection as we need most of the fields

//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error fetching bookings for the employee" });
//   }
// }

export async function getEmployeeBookings(req, res, next) {
  const employeeId = req.query.employeeId; // Adjust according to your authentication setup
  console.log(employeeId);
  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    // Convert employeeId to ObjectId
    const driverId = new mongoose.Types.ObjectId(employeeId);
    const bookings = await Booking.find({ employees: driverId }).populate({
      path: "clientId",
      select: "name phone", // Assuming the client's name and phone fields are 'name' and 'phone'
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

export async function getCurrentEmployeeBooking(req, res, next) {
  const employeeId = new mongoose.Types.ObjectId(req.query.employeeId);

  //add field to get supervisor
  try {
    const result = await Booking.aggregate([
      {
        $match: {
          employees: { $in: [employeeId] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $lookup: {
          from: "inventories",
          localField: "inventoryId",
          foreignField: "_id",
          as: "inventory",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $unwind: {
          path: "$client",
          preserveNullAndEmptyArrays: true, // Use this if a booking may not have a client
        },
      },
      {
        $unwind: "$company",
      },
      {
        $unwind: "$inventory",
      },
      {
        $lookup: {
          from: "users",
          localField: "employees",
          foreignField: "_id",
          as: "employeesData",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employees",
          foreignField: "_id",
          as: "employeeTitles",
        },
      },
      {
        $project: {
          companyId: "$company._id",
          companyName: "$company.name",
          pickupAddress: "$pickupAddress",
          destinationAddress: "$destinationAddress",
          clientName: "$client.name",
          clientPhone: "$client.phone",
          clientEmail: "$client.email",
          clientCnic: "$client.cnic",
          status: 1,
          services: 1,
          supervisorId: 1,
          cart: {
            $map: {
              input: "$cart",
              as: "cartItem",
              in: {
                name: "$$cartItem.name",
                quantity: "$$cartItem.quantity",
                movingPrice: {
                  $arrayElemAt: [
                    "$inventory.inventory.movingPrice",
                    {
                      $indexOfArray: [
                        "$inventory.inventory.name",
                        "$$cartItem.name",
                      ],
                    },
                  ],
                },
                packingPrice: {
                  $arrayElemAt: [
                    "$inventory.inventory.packingPrice",
                    {
                      $indexOfArray: [
                        "$inventory.inventory.name",
                        "$$cartItem.name",
                      ],
                    },
                  ],
                },
                unpackingPrice: {
                  $arrayElemAt: [
                    "$inventory.inventory.unpackingPrice",
                    {
                      $indexOfArray: [
                        "$inventory.inventory.name",
                        "$$cartItem.name",
                      ],
                    },
                  ],
                },
              },
            },
          },
          inventoryId: "$inventory._id",
          employees: {
            $map: {
              input: "$employeesData",
              as: "employee",
              in: {
                name: "$$employee.name",
                phone: "$$employee.phone",
                employeeId: "$$employee._id",
                title: {
                  $arrayElemAt: [
                    "$employeeTitles.title",
                    {
                      $indexOfArray: ["$employeeTitles._id", "$$employee._id"],
                    },
                  ],
                },
              },
            },
          },
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 1, // This will get you only the latest booking
      },
    ]);

    res.status(200).json({ status: "ok", data: result });
  } catch (error) {
    next(error);
  }
}

export async function putBookingStatus(req, res, next) {
  const bookingId = new mongoose.Types.ObjectId(req.body.bookingId);
  const status = req.body.status;
  try {
    const result = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true }
    );

    if (status === "completed") {
      const employeesList = result._doc.employees;

      await Employee.updateMany(
        { _id: { $in: employeesList } }, // Query to target specific employees
        { $set: { status: "free" } }, // Update operation
        { new: true, multi: true }
      );
    }

    res.status(200).json({ status: "ok", data: result._doc });
  } catch (error) {
    next(error);
  }
}
