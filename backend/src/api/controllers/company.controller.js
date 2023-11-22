import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Booking from '../models/Booking.model.js'
import Employee from '../models/Employee.model.js'
import Inventory from '../models/Inventory.model.js'
import Review from '../models/Review.model.js'
import User from '../models/User.model.js'

//Add Employee
export async function postEmployee(req, res, next) {
	const { name, email, password, phone, cnic, title, companyId } = req.body
	console.log(companyId)

	try {
		// const hash = bcrypt.hashSync(req.body.password, 5);

		//create user as an employee
		const user = new User({
			...req.body,
			// password: hash,
			role: 'employee',
		})

		const userResult = await user.save()
		const userId = userResult._doc._id

		const employee = new Employee({
			_id: userId,
			companyId,
			title,
		})

		const employeeResult = await employee.save()

		res.status(200).json({
			status: 'ok',
			data: { ...userResult._doc, ...employeeResult._doc },
		})
	} catch (error) {
		next(error)
	}
}

export async function deleteEmployee(req, res, next) {
	const { employeeId } = req.body

	const employeeIdObj = new mongoose.Types.ObjectId(employeeId)

	try {
		const employeeResult = await Employee.findByIdAndUpdate(
			employeeIdObj,
			{
				isDeleted: true,
			},
			{ new: true }
		)
		const userResult = await User.findByIdAndUpdate(
			employeeIdObj,
			{ isDeleted: true },
			{ new: true }
		)

		res.status(200).json({
			status: 'ok',
			data: { _id: userResult._doc._id },
		})
	} catch (error) {
		next(error)
	}
}

export async function putEmployee(req, res, next) {
	const { employeeId, name, email, password, phone, cnic, title } = req.body

	const employeeIdObj = new mongoose.Types.ObjectId(employeeId)

	try {
		const employeeResult = await Employee.findByIdAndUpdate(
			employeeIdObj,
			{
				title,
			},
			{ new: true }
		)
		const userResult = await User.findByIdAndUpdate(
			employeeIdObj,
			{ name, email, password, phone, cnic },
			{ new: true }
		)

		res.status(200).json({
			status: 'ok',
			data: { ...userResult._doc, ...employeeResult._doc },
		})
	} catch (error) {
		next(error)
	}
}

export const getCompanyEmployees = async (req, res, next) => {
	const companyId = req.query.companyId
	try {
		const employee = await Employee.aggregate([
			{
				$match: {
					companyId: new mongoose.Types.ObjectId(companyId),
					isDeleted: false,
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'userInfo',
				},
			},
			{ $unwind: '$userInfo' },
			{
				$project: {
					_id: 1,
					name: '$userInfo.name',
					email: '$userInfo.email',
					phone: '$userInfo.phone',
					cnic: '$userInfo.cnic',
					title: 1,
					status: 1,
					companyId: 1,
				},
			},
		])

		if (employee.length === 0) {
			return res.status(200).json({
				status: 'noData',
				data: [],
				message: 'No employees found for this company',
			})
		}

		res.status(200).json({
			status: 'ok',
			data: employee,
		})
	} catch (error) {
		next(error)
	}
}

export async function getClientReviews(req, res, next) {
	let companyId = req.query.companyId
	companyId = new mongoose.Types.ObjectId(companyId)

	try {
		const result = await Booking.aggregate([
			{
				$match: { companyId: companyId },
			},
			{
				$lookup: {
					from: 'users', // Replace with the actual name of the User collection
					localField: 'clientId',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: '$user',
			},
			{
				$lookup: {
					from: 'reviews', // Replace with the actual name of the Review collection
					localField: '_id',
					foreignField: '_id',
					as: 'review',
				},
			},
			{
				$unwind: '$review',
			},
			{
				$project: {
					companyId: 1,
          supervisorId: 1,
					reviewId: '$review._id',
					clientName: '$user.name',
					comment: '$review.comment',
					reply: '$review.reply',
					rating: '$review.rating',
					_id: 0, // Exclude _id field
				},
			},
		])

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

export async function putClientReviews(req, res, next) {
	const { bookingId, reply } = req.body

	// const bookingId = new mongoose.Types.ObjectId(reviewId);

	try {
		const result = await Review.findByIdAndUpdate(
			bookingId,
			{ reply },
			{ new: true }
		)

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

export async function getAllClientBookings(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const result = await Booking.aggregate([
			{
				$match: { companyId: companyId },
			},
			{
				$lookup: {
					from: 'users', // Name of the users collection
					localField: 'clientId', // Match clientId in bookings with _id in users
					foreignField: '_id',
					as: 'client',
				},
			},
			{
				$lookup: {
					from: 'inventories', // Name of the inventories collection
					localField: 'inventoryId',
					foreignField: '_id',
					as: 'inventory',
				},
			},
			{
				$unwind: '$client',
			},
			{
				$unwind: '$inventory',
			},
			{
				$lookup: {
					from: 'users', // Name of the users collection
					localField: 'employees',
					foreignField: '_id',
					as: 'employeesData',
				},
			},
			{
				$project: {
					clientId: 1,
					clientName: '$client.name', // Use the client's name from the 'client' field
					pickupAddress: '$pickupAddress',
					destinationAddress: '$destinationAddress',
					status: 1,
					services: 1,
          supervisorId: 1,
					cart: {
						$map: {
							input: '$cart',
							as: 'cartItem',
							in: {
								name: '$$cartItem.name',
								quantity: '$$cartItem.quantity',
								movingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.movingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								packingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.packingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								unpackingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.unpackingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
							},
						},
					},
					inventoryId: '$inventory._id',
					employees: '$employeesData.name', // Use the names of employees from the new 'employeesData' field
					createdAt: 1,
				},
			},
		])

		console.log('hello')

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

export async function postInventory(req, res, next) {
	let { inventory } = req.body
	const companyId = new mongoose.Types.ObjectId(req.body.companyId)

	try {
		// delete all previous record
		await Inventory.updateMany(
			{ companyId: companyId },
			{ $set: { isDeleted: true } }
		)

		//! Case 1: we have to create a new inventory
		const newInventory = new Inventory({ companyId, inventory })
		await newInventory.save()

		return res.status(201).json({
			status: 'ok',
			data: inventory,
			message: 'Case 1: first time creation',
		})
	} catch (error) {
		next(error)
	}
}

export async function updateInventory(req, res, next) {
	let { inventory } = req.body
	const companyId = new mongoose.Types.ObjectId(req.body.companyId)

	try {
		// Check if inventory exists for the given companyId
		const existingInventory = await Inventory.findOne({
			companyId,
			isDeleted: false,
		}).sort({
			createdAt: -1,
		})
		let result

		if (!existingInventory) {
			//! Case 1: we have to create a new inventory
			const newInventory = new Inventory({ companyId, inventory })
			result = await newInventory.save()

			return res.status(201).json({
				status: 'ok',
				data: inventory,
				message: 'Case 1: first time creation',
			})
		}

		// Convert MongoDB documents to plain objects
		const plainExistingInventory = existingInventory.inventory.map((item) =>
			item.toObject()
		)

		const isItemMatch = (item1, item2) => {
			return (
				item1.name === item2.name &&
				item1.movingPrice === item2.movingPrice &&
				item1.packingPrice === item2.packingPrice &&
				item1.unpackingPrice === item2.unpackingPrice
			)
		}

		// Check if all items and prices exactly match
		const allMatch = inventory.every((inputItem) =>
			plainExistingInventory.some((dataItem) =>
				isItemMatch(inputItem, dataItem)
			)
		)

		if (allMatch) {
			//! Case 2: All items and prices exactly matched

			//FIXME: find appropriate error for this
			return res.status(200).json({
				status: 'ok',
				data: inventory,
				message: 'Case 2: all items and prices are same No inventory created',
			})
		} else {
			const allNamesDifferent = inventory.every(
				(inputItem) =>
					!plainExistingInventory.some(
						(dataItem) => inputItem.name === dataItem.name
					)
			)

			if (allNamesDifferent) {
				//! Case 3: all inventory items are different update the latest inventory

				const result = await Inventory.findOneAndUpdate(
					{ companyId: companyId },
					{ $push: { inventory: { $each: inventory } } },
					{ new: true, sort: { createdAt: -1 } }
				)

				const resultObj = result.inventory.map((item) => item.toObject())
				const resultWithoutId = resultObj.map(({ _id, ...rest }) => ({
					...rest,
				}))

				return res.status(200).json({
					status: 'ok',
					data: resultWithoutId,
					message:
						'Case 3: all items and prices are different latest inventory updated',
				})
			} else {
				//! Case 4: if some prices or some names are different then create a new inventory
				// Function to remove _id property and clone the object
				const cloneWithoutId = ({ _id, ...rest }) => ({ ...rest })

				// new array which have all objects of inventory and dbInventory but with 2 conditions
				// condition 1: put all objects of inventory and dbInventory into new array whose name dont match
				// condition 2: if names match then push only inventory object
				const mergedArray = [
					...inventory,
					...plainExistingInventory
						.map(cloneWithoutId)
						.filter(
							(dbItem) =>
								!inventory.some((invItem) => invItem.name === dbItem.name)
						),
				]

				await Inventory.updateMany(
					{ companyId: companyId },
					{ $set: { isDeleted: true } }
				)

				const inventoryDBInstance = new Inventory({
					companyId,
					inventory: mergedArray,
				})
				result = await inventoryDBInstance.save()

				return res.status(201).json({
					status: 'ok',
					data: mergedArray,
					message:
						'Case 4: items are different but some are same so new inventory is created ',
				})
			}
		}
	} catch (error) {
		next(error)
	}
}

export async function deleteInventory(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.body.companyId)
	try {
		// delete all previous record
		await Inventory.updateMany(
			{ companyId: companyId },
			{ $set: { isDeleted: true } }
		)

		return res.status(200).json({
			status: 'ok',
			data: [],
			message: 'items deleted',
		})
	} catch (error) {
		next(error)
	}
}

export async function getLatestInventory(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const latestInventory = await Inventory.findOne({
			companyId,
			isDeleted: false,
		}).sort({
			createdAt: -1,
		}) // Sort by createdAt in descending order

		if (!latestInventory) {
			return res
				.status(200)
				.json({ status: 'ok', data: [], message: 'Inventory not found' })
		}

		res.status(200).json({
			status: 'ok',
			data: latestInventory.inventory, // Just send the inventory array
		})
	} catch (error) {
		next(error) // Pass errors to the error-handling middleware
	}
}

export async function getBookingRequests(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const result = await Booking.aggregate([
			{
				$match: { companyId: companyId, status: 'requested' },
			},
			{
				$lookup: {
					from: 'users', // Name of the users collection
					localField: 'clientId', // Match clientId in bookings with _id in users
					foreignField: '_id',
					as: 'client',
				},
			},
			{
				$lookup: {
					from: 'inventories', // Name of the inventories collection
					localField: 'inventoryId',
					foreignField: '_id',
					as: 'inventory',
				},
			},
			{
				$unwind: '$client',
			},
			{
				$unwind: '$inventory',
			},
			{
				$lookup: {
					from: 'users', // Name of the users collection
					localField: 'employees',
					foreignField: '_id',
					as: 'employeesData',
				},
			},
			{
				$project: {
					clientId: 1,
					clientName: '$client.name', // Use the client's name from the 'client' field
					pickupAddress: '$pickupAddress',
					destinationAddress: '$destinationAddress',
					status: 1,
					services: 1,
          supervisorId: 1,
					cart: {
						$map: {
							input: '$cart',
							as: 'cartItem',
							in: {
								name: '$$cartItem.name',
								quantity: '$$cartItem.quantity',
								movingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.movingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								packingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.packingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								unpackingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.unpackingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
							},
						},
					},
					inventoryId: '$inventory._id',
					employees: '$employeesData.name', // Use the names of employees from the new 'employeesData' field
					createdAt: 1,
				},
			},
		])

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

export async function postBookingRequest(req, res, next) {
	const { bookingId, status, employees } = req.body

	//FIXME: validation of bookingId and status must be accepted or decline => if declined do something like sending user a message or email of reason of declined
	//TODO: we also have to add employees ids to employee array
	try {
		const result = await Booking.findByIdAndUpdate(
			bookingId,
			{ status, employees },
			{ returnOriginal: false } //? to get the updated result
		)

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

export async function getInprogressBooking(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const result = await Booking.aggregate([
			{
				$match: {
					companyId: companyId,
					status: { $nin: ['requested', 'completed'] }, // Exclude 'requested' and 'completed'
				},
			},
			{
				$lookup: {
					from: 'users', // Name of the users collection
					localField: 'clientId', // Match clientId in bookings with _id in users
					foreignField: '_id',
					as: 'client',
				},
			},
			{
				$lookup: {
					from: 'inventories', // Name of the inventories collection
					localField: 'inventoryId',
					foreignField: '_id',
					as: 'inventory',
				},
			},
			{
				$unwind: '$client',
			},
			{
				$unwind: '$inventory',
			},
			{
				$lookup: {
					from: 'users', // Name of the users collection
					localField: 'employees',
					foreignField: '_id',
					as: 'employeesData',
				},
			},
			{
				$project: {
					clientId: 1,
					clientName: '$client.name', // Use the client's name from the 'client' field
					pickupAddress: '$pickupAddress',
					destinationAddress: '$destinationAddress',
					status: 1,
					services: 1,
          supervisorId: 1,
					cart: {
						$map: {
							input: '$cart',
							as: 'cartItem',
							in: {
								name: '$$cartItem.name',
								quantity: '$$cartItem.quantity',
								movingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.movingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								packingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.packingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								unpackingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.unpackingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
							},
						},
					},
					inventoryId: '$inventory._id',
					employees: '$employeesData.name', // Use the names of employees from the new 'employeesData' field
					createdAt: 1,
				},
			},
		])

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}

export const getCompanyFreeEmployees = async (req, res, next) => {
	const companyId = req.query.companyId
	try {
		const results = await Employee.find({
			companyId,
			status: 'free',
			isDeleted: false,
		}).populate({
			path: '_id',
			select: 'name', // Only fetch the name from the User collection
			model: User,
		})
		if (results.length === 0) {
			return res.status(200).json({
				message: 'No employees found for this company',
				data: results,
			})
		}

		const transformedResults = results.map((result) => ({
			_id: result._id._id,
			name: result._id.name,
			title: result.title,
		}))

		res.status(200).json({ status: 'ok', data: transformedResults })
	} catch (error) {
		next(error)
	}
}

export async function putApproveBookingReq(req, res, next) {
	//request status can be approved or declined
	const { bookingId, employeeIds, supervisorId } = req.body

	try {
		const employeeResults = await Employee.updateMany(
			{ _id: { $in: employeeIds } },
			{ status: 'reserved' },
			{ new: true }
		)

		const bookingResults = await Booking.findByIdAndUpdate(
			bookingId,
			{
				$push: { employees: { $each: employeeIds } },
				$set: { status: 'approved', supervisorId: supervisorId },
			},
			{ new: true }
		)

		res.json({
			status: 'ok',
			data: { employee: employeeResults._doc, booking: bookingResults._doc },
		})
	} catch (error) {
		next(error)
	}
}

export async function putDeclineBookingReq(req, res, next) {
	const { bookingId } = req.body

	try {
		const result = await Booking.findByIdAndUpdate(
			bookingId,
			{
				$set: { status: 'declined' },
			},
			{ new: true }
		)

		res.status(200).json({ status: 'ok', data: result._doc })
	} catch (error) {
		next(error)
	}
}

//!FIXME: it is same as in client there should be only 1 api to handle both cases
export async function getCompletedBookings(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const result = await Booking.aggregate([
			{
				$match: {
					companyId,
					status: 'completed',
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'companyId',
					foreignField: '_id',
					as: 'company',
				},
			},
			{
				$lookup: {
					from: 'inventories',
					localField: 'inventoryId',
					foreignField: '_id',
					as: 'inventory',
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'clientId',
					foreignField: '_id',
					as: 'client',
				},
			},
			{
				$unwind: {
					path: '$client',
					preserveNullAndEmptyArrays: true, // Use this if a booking may not have a client
				},
			},
			{
				$unwind: '$company',
			},
			{
				$unwind: '$inventory',
			},
			{
				$lookup: {
					from: 'users',
					localField: 'employees',
					foreignField: '_id',
					as: 'employeesData',
				},
			},
			{
				$lookup: {
					from: 'employees',
					localField: 'employees',
					foreignField: '_id',
					as: 'employeeTitles',
				},
			},
			{
				$lookup: {
					from: 'reviews',
					localField: '_id',
					foreignField: '_id',
					as: 'review',
				},
			},
			{
				$unwind: {
					path: '$review',
					preserveNullAndEmptyArrays: true, // Use this if a booking may not have a review
				},
			},
			{
				$project: {
					companyId: '$company._id',
					companyName: '$company.name',
					pickupAddress: '$pickupAddress',
					destinationAddress: '$destinationAddress',
					clientName: '$client.name',
					clientPhone: '$client.phone',
					clientEmail: '$client.email',
					clientCnic: '$client.cnic',
					status: 1,
					services: 1,
          supervisorId: 1,
					cart: {
						$map: {
							input: '$cart',
							as: 'cartItem',
							in: {
								name: '$$cartItem.name',
								quantity: '$$cartItem.quantity',
								movingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.movingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								packingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.packingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
								unpackingPrice: {
									$arrayElemAt: [
										'$inventory.inventory.unpackingPrice',
										{
											$indexOfArray: [
												'$inventory.inventory.name',
												'$$cartItem.name',
											],
										},
									],
								},
							},
						},
					},
					inventoryId: '$inventory._id',
					employees: {
						$map: {
							input: '$employeesData',
							as: 'employee',
							in: {
								name: '$$employee.name',
								phone: '$$employee.phone',
                _id: '$$employee._id',
								title: {
									$arrayElemAt: [
										'$employeeTitles.title',
										{
											$indexOfArray: ['$employeeTitles._id', '$$employee._id'],
										},
									],
								},
							},
						},
					},
					createdAt: 1,
					review: '$review',
				},
			},
			{
				$sort: { createdAt: -1 },
			},
		])

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		console.error('Error fetching user bookings:', error)
		next(error)
	}
}
