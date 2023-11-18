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
					pickupAddress: '$pickUpAddress',
					destinationAddress: '$destinationAddress',
					status: 1,
					services: 1,
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

export async function postProduct(req, res, next) {
	// const companyId = new mongoose.Types.ObjectId(req.body.companyId)
	const { companyId, inventory } = req.body

	try {
		//? Check if the company exists in the Inventory collection
		// Check if the company exists in the Inventory collection
		const existingInventory = await Inventory.findOne({ companyId }).sort({
			createdAt: -1,
		})
		let result
		let message
		if (!existingInventory) {
			// If the company doesn't exist, insert the data as a new document
			const newInventory = new Inventory({ companyId, inventory })
			result = await newInventory.save()
			message = 'case 1: first time inventory created'
		} else {
			let shouldCreateNewCollection = false

			// Filter out existing products from the new inventory
			const filteredInventory = inventory.filter((product) => {
				const existingProductIndex = existingInventory.inventory.findIndex(
					(existingProduct) => existingProduct.name === product.name
				)

				if (existingProductIndex === -1) {
					// Product doesn't exist in the current inventory, add it
					return true
				} else {
					// Product already exists in the current inventory, update its prices
					existingInventory.inventory[existingProductIndex] = product
					shouldCreateNewCollection = true
					return false
				}
			})

			if (shouldCreateNewCollection) {
				// Create a new inventory document with the existing products and the new products
				const updatedInventory = new Inventory({
					companyId,
					inventory: [...existingInventory.inventory, ...filteredInventory],
				})

				result = await updatedInventory.save()
				message =
					'case 2: new inventory created as some product already existed'
			} else {
				// Update the existing inventory with the filtered inventory
				existingInventory.inventory = [
					...existingInventory.inventory,
					...filteredInventory,
				]
				result = await existingInventory.save()
				message = 'case 3: add product to latest collection'
			}
		}
		console.log(message)
		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
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
					pickupAddress: '$pickUpAddress',
					destinationAddress: '$destinationAddress',
					status: 1,
					services: 1,
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
					pickupAddress: '$pickUpAddress',
					destinationAddress: '$destinationAddress',
					status: 1,
					services: 1,
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

export async function getLatestInventory(req, res, next) {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const latestInventory = await Inventory.findOne({ companyId })
			.sort({ createdAt: -1 }) // Sort by createdAt in descending order
			.exec() // Execute the query

		if (!latestInventory) {
			return res
				.status(404)
				.json({ status: 'error', message: 'Inventory not found' })
		}

		res.status(200).json({
			status: 'ok',
			data: latestInventory.inventory, // Just send the inventory array
		})
	} catch (error) {
		next(error) // Pass errors to the error-handling middleware
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
	const { bookingId, employeeIds } = req.body

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
				$set: { status: 'approved' },
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
					pickupAddress: '$pickUpAddress',
					destinationAddress: '$destinationAddress',
					clientName: '$client.name',
					clientPhone: '$client.phone',
					clientEmail: '$client.email',
					clientCnic: '$client.cnic',
					status: 1,
					services: 1,
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
