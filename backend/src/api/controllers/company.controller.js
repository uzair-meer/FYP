import mongoose from "mongoose";
import Booking from "../models/Booking.model.js";
import Employee from "../models/Employee.model.js";
import Inventory from "../models/Inventory.model.js";
import Review from "../models/Review.model.js";
import User from "../models/User.model.js";

//Add Employee
export async function postEmployee(req, res, next) {
  const { name, email, password, phone, title, companyId } = req.body;
  console.log(companyId);
  try {
    //create user as an employee
    const user = new User({
      name,
      email,
      password,
      role: "employee",
      phone,
    });

    const userResult = await user.save();
    const userId = userResult._doc._id;

    const employee = new Employee({
      _id: userId,
      companyId,
      title,
    });

    const employeeResult = await employee.save();

    res.status(200).json({
      status: "ok",
      data: { ...userResult._doc, ...employeeResult._doc },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  let { employeeId } = req.body;

  employeeId = new mongoose.Types.ObjectId(employeeId);

  try {
    const employeeResult = await Employee.findByIdAndRemove(employeeId);
    const userResult = await User.findByIdAndRemove(employeeId);

    res.status(200).json({
      status: "ok",
      data: { user: userResult, employee: employeeResult },
    });
  } catch (error) {
    next(error);
  }
}

export async function putEmployee(req, res, next) {
  const { employeeId, name, title } = req.body;

  const employeeIdObj = new mongoose.Types.ObjectId(employeeId);

  try {
    const employeeResult = await Employee.findByIdAndUpdate(employeeIdObj, {
      title,
    });
    const userResult = await User.findByIdAndUpdate(employeeIdObj, { name });

    console.log(employeeResult);
    console.log(userResult);

    res.status(200).json({
      status: "ok",
      data: { user: userResult, employee: employeeResult },
    });
  } catch (error) {
    next(error);
  }
}

export async function getClientReviews(req, res, next) {
  let companyId = req.query.companyId;
  companyId = new mongoose.Types.ObjectId(companyId);

  try {
    const result = await Booking.aggregate([
      {
        $match: { companyId: companyId },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual name of the User collection
          localField: "clientId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "reviews", // Replace with the actual name of the Review collection
          localField: "_id",
          foreignField: "_id",
          as: "review",
        },
      },
      {
        $unwind: "$review",
      },
      {
        $project: {
          companyId: 1,
          reviewId: "$review._id",
          clientName: "$user.name",
          comment: "$review.comment",
          reply: "$review.reply",
          rating: "$review.rating",
          _id: 0, // Exclude _id field
        },
      },
    ]);

    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function putClientReviews(req, res, next) {
  const { reviewId, reply } = req.body;

  const reviewIdObj = new mongoose.Types.ObjectId(reviewId);

  try {
    const result = await Review.findByIdAndUpdate(reviewIdObj, { reply });

    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllClientBookings(req, res, next) {
  const companyId = new mongoose.Types.ObjectId(req.query.companyId);

  try {
    const result = await Booking.aggregate([
      {
        $match: { companyId: companyId },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "clientId", // Match clientId in bookings with _id in users
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $lookup: {
          from: "inventories", // Name of the inventories collection
          localField: "inventoryId",
          foreignField: "_id",
          as: "inventory",
        },
      },
      {
        $unwind: "$client",
      },
      {
        $unwind: "$inventory",
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "employees",
          foreignField: "_id",
          as: "employeesData",
        },
      },
      {
        $project: {
          clientId: 1,
          clientName: "$client.name", // Use the client's name from the 'client' field
          pickupAddress: "$pickUpAddress",
          destinationAddress: "$destinationAddress",
          status: 1,
          services: 1,
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
          employees: "$employeesData.name", // Use the names of employees from the new 'employeesData' field
          createdAt: 1,
        },
      },
    ]);

    console.log("hello");

    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
export async function postProduct(req, res, next) {
  // const companyId = new mongoose.Types.ObjectId(req.body.companyId)
  const { companyId, inventory } = req.body;

  try {
    //? Check if the company exists in the Inventory collection
    // Check if the company exists in the Inventory collection
    const existingInventory = await Inventory.findOne({ companyId }).sort({
      createdAt: -1,
    });
    let result;
    let message;
    if (!existingInventory) {
      // If the company doesn't exist, insert the data as a new document
      const newInventory = new Inventory({ companyId, inventory });
      result = await newInventory.save();
      message = "case 1: first time inventory created";
    } else {
      let shouldCreateNewCollection = false;

      // Filter out existing products from the new inventory
      const filteredInventory = inventory.filter((product) => {
        const existingProductIndex = existingInventory.inventory.findIndex(
          (existingProduct) => existingProduct.name === product.name
        );

        if (existingProductIndex === -1) {
          // Product doesn't exist in the current inventory, add it
          return true;
        } else {
          // Product already exists in the current inventory, update its prices
          existingInventory.inventory[existingProductIndex] = product;
          shouldCreateNewCollection = true;
          return false;
        }
      });

      if (shouldCreateNewCollection) {
        // Create a new inventory document with the existing products and the new products
        const updatedInventory = new Inventory({
          companyId,
          inventory: [...existingInventory.inventory, ...filteredInventory],
        });

        result = await updatedInventory.save();
        message =
          "case 2: new inventory created as some product already existed";
      } else {
        // Update the existing inventory with the filtered inventory
        existingInventory.inventory = [
          ...existingInventory.inventory,
          ...filteredInventory,
        ];
        result = await existingInventory.save();
        message = "case 3: add product to latest collection";
      }
    }
    console.log(message);
    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBookingRequests(req, res, next) {
  const companyId = new mongoose.Types.ObjectId(req.query.companyId);

  try {
    const result = await Booking.aggregate([
      {
        $match: { companyId: companyId, status: "requested" },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "clientId", // Match clientId in bookings with _id in users
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $lookup: {
          from: "inventories", // Name of the inventories collection
          localField: "inventoryId",
          foreignField: "_id",
          as: "inventory",
        },
      },
      {
        $unwind: "$client",
      },
      {
        $unwind: "$inventory",
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "employees",
          foreignField: "_id",
          as: "employeesData",
        },
      },
      {
        $project: {
          clientId: 1,
          clientName: "$client.name", // Use the client's name from the 'client' field
          pickupAddress: "$pickUpAddress",
          destinationAddress: "$destinationAddress",
          status: 1,
          services: 1,
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
          employees: "$employeesData.name", // Use the names of employees from the new 'employeesData' field
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function postBookingRequest(req, res, next) {
  const { bookingId, status, employees } = req.body;

  //FIXME: validation of bookingId and status must be accepted or decline => if declined do something like sending user a message or email of reason of declined
  //TODO: we also have to add employees ids to employee array
  try {
    const result = await Booking.findByIdAndUpdate(
      bookingId,
      { status, employees },
      { returnOriginal: false } //? to get the updated result
    );

    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getInprogressBooking(req, res, next) {
  const companyId = new mongoose.Types.ObjectId(req.query.companyId);

  try {
    const result = await Booking.aggregate([
      {
        $match: {
          companyId: companyId,
          status: { $nin: ["requested", "completed"] }, // Exclude 'requested' and 'completed'
        },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "clientId", // Match clientId in bookings with _id in users
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $lookup: {
          from: "inventories", // Name of the inventories collection
          localField: "inventoryId",
          foreignField: "_id",
          as: "inventory",
        },
      },
      {
        $unwind: "$client",
      },
      {
        $unwind: "$inventory",
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "employees",
          foreignField: "_id",
          as: "employeesData",
        },
      },
      {
        $project: {
          clientId: 1,
          clientName: "$client.name", // Use the client's name from the 'client' field
          pickupAddress: "$pickUpAddress",
          destinationAddress: "$destinationAddress",
          status: 1,
          services: 1,
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
          employees: "$employeesData.name", // Use the names of employees from the new 'employeesData' field
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLatestInventory(req, res, next) {
  const companyId = new mongoose.Types.ObjectId(req.query.companyId);

  try {
    const latestInventory = await Inventory.findOne({ companyId })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .exec(); // Execute the query

    if (!latestInventory) {
      return res
        .status(404)
        .json({ status: "error", message: "Inventory not found" });
    }

    res.status(200).json({
      status: "ok",
      data: latestInventory.inventory, // Just send the inventory array
    });
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
}

export const getCompanyEmployees = async (req, res, next) => {
  const companyId = req.query.companyId;
  try {
    // Find all employee documents linked to this company
    const employeeDocs = await Employee.find({ companyId }).populate(
      "employeeId"
    );

    if (employeeDocs.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for this company" });
    }

    // Format the response to include employee details
    const employees = employeeDocs.map((doc) => {
      const user = doc.employeeId;
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        title: doc.title,
      };
    });

    res.status(200).json({
      message: "Employees fetched successfully",
      employees: employees,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyFreeEmployees = async (req, res, next) => {
  const companyId = req.query.companyId;
  console.log(companyId);
  try {
    const results = await Employee.find({ companyId, status: "free" }).populate(
      {
        path: "_id",
        select: "name", // Only fetch the name from the User collection
        model: User,
      }
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for this company" });
    }

    const transformedResults = results.map((result) => ({
      _id: result._id._id,
      name: result._id.name,
      title: result.title,
    }));

    res.status(200).json(transformedResults);
  } catch (error) {
    next(error);
  }
};

export async function assignEmployeesToBooking(req, res, next) {
  //request status can be approved or declined
  const { bookingId, requestStatus } = req.body;

  //should be proper validation here
  // if (requestStatus !== "declined" || requestStatus !== "approved") {
  //   //! FIXME throw error here
  //   res.status(500).json({message: "enter complete and accurate fields"})
  //   return
  // }

  try {
    if (requestStatus === "declined") {
      const result = await Booking.findByIdAndUpdate(
        bookingId,
        {
          $set: { status: "declined" },
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "request declined successfully", result });
      // return;
    }

    const { employeeIds } = req.body;
    // Validate employee IDs and ensure they are 'free'
    const employees = await Employee.find({
      _id: { $in: employeeIds },
      status: "free",
    });

    if (employees.length !== employeeIds.length) {
      return res
        .status(400)
        .json({ message: "Some employees are not available" });
    }

    // Update employees status to 'reserved'
    const employeeResults = await Employee.updateMany(
      { _id: { $in: employeeIds } },
      { status: "reserved" }
    );

    // Update the booking with the selected employees
    const bookingResults = await Booking.findByIdAndUpdate(
      bookingId,
      {
        $push: { employees: { $each: employeeIds } },
        $set: { status: "approved" },
      },
      { new: true }
    );

    res.json({
      message: "Employees assigned successfully",
      data: { employeeResults, bookingResults },
    });
  } catch (error) {
    next(error);
  }
}
