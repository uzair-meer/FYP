import Company from '../models/Company.model.js'
import User from '../models/User.model.js'

export async function getCompanyRequests(req, res, next) {
	try {
		const result = await Company.aggregate([
			{ $match: { status: 'requested' } },
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'userData',
				},
			},
			{
				$project: {
					status: 1, // Include Company fields
					createdAt: 1,
					ntn: 1,
					name: { $arrayElemAt: ['$userData.name', 0] }, // Project User fields to top level
					email: { $arrayElemAt: ['$userData.email', 0] },
					phone: { $arrayElemAt: ['$userData.phone', 0] },
				},
			},
		])

		res.status(200).json({
			status: 'ok',
			data: result, //_doc contains that data freshly entered in db
		})
	} catch (error) {
		next(error)
	}
}

export async function putCompanyRequest(req, res, next) {
	//FIXME: must check status only be approved or declined | validation
	const { companyId, status } = req.body

	try {
		const result = await Company.findOneAndUpdate(
			{ _id: companyId },
			{ $set: { status } },
			{ new: true }
		)

		res.status(200).json({
			status: 'ok',
			data: result, //_doc contains that data freshly entered in db
		})
	} catch (error) {
		next(error)
	}
}

// export const getAllCompanies = async (req, res, next) => {
//   try {
//     // Query the database to find all companies with status "pending"
//     const pendingCompanies = await User.find({
//       role: "company",
//       status: "pending",
//     });

//     // Render the admin dashboard with the list of pending companies
//     res.status(200).json({
//       status: "ok",
//       data: pendingCompanies,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// };

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
