import User from "../models/User.model.js";

export const getAllCompanies = async (req, res, next) => {
  try {
    // Query the database to find all companies with status "pending"
    const pendingCompanies = await User.find({
      role: "company",
      status: "pending",
    });

    // Render the admin dashboard with the list of pending companies
    res.status(200).json({
      status: "ok",
      data: pendingCompanies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// export const createService = async (req, res) => {
//   try {
//     const service = new Service(req.body);
//     await service.save();
//     res.status(201).send(service);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // READ: Get a specific service by ID
// export const getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) {
//       return res.status(404).send();
//     }
//     res.send(service);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // UPDATE: Modify a specific service by ID
// export const updateService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!service) {
//       return res.status(404).send();
//     }
//     res.send(service);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // DELETE: Remove a specific service by ID
// export const deleteService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);
//     if (!service) {
//       return res.status(404).send();
//     }
//     res.send(service);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // READ: Get all services
// export const getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.send(services);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
