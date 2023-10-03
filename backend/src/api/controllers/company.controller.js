import mongoose from 'mongoose'
import Booking from '../models/Booking.model.js'
import Employee from '../models/Employee.model.js'
import User from '../models/User.model.js'
import Review from '../models/Review.model.js'

export async function postEmployee(req, res, next) {
	const { name, email, password, phone, companyId, title } = req.body

	try {
		//create user as an employee
		const user = new User({
			name,
			email,
			password,
			role: 'employee',
			phone,
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
			data: { user: userResult._doc, employee: employeeResult._doc },
		})
	} catch (error) {
		next(error)
	}
}

export async function deleteEmployee(req, res, next) {
	let { employeeId } = req.body

	employeeId = new mongoose.Types.ObjectId(employeeId)

	try {
		const employeeResult = await Employee.findByIdAndRemove(employeeId)
		const userResult = await User.findByIdAndRemove(employeeId)

		res.status(200).json({
			status: 'ok',
			data: { user: userResult, employee: employeeResult },
		})
	} catch (error) {
		next(error)
	}
}

export async function putEmployee(req, res, next) {
	const { employeeId, name, title } = req.body

	const employeeIdObj = new mongoose.Types.ObjectId(employeeId)

	try {
		const employeeResult = await Employee.findByIdAndUpdate(employeeIdObj, {
			title,
		})
		const userResult = await User.findByIdAndUpdate(employeeIdObj, { name })

		console.log(employeeResult)
		console.log(userResult)

		res.status(200).json({
			status: 'ok',
			data: { user: userResult, employee: employeeResult },
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
	const {reviewId, reply} = req.body

	const reviewIdObj = new mongoose.Types.ObjectId(reviewId)

	try {
		const result = await Review.findByIdAndUpdate(reviewIdObj, {reply})

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
									$arrayElemAt: ['$inventory.inventory.movingPrice', {
										$indexOfArray: ['$inventory.inventory.name', '$$cartItem.name'],
									}],
								},
								packingPrice: {
									$arrayElemAt: ['$inventory.inventory.packingPrice', {
										$indexOfArray: ['$inventory.inventory.name', '$$cartItem.name'],
									}],
								},
								unpackingPrice: {
									$arrayElemAt: ['$inventory.inventory.unpackingPrice', {
										$indexOfArray: ['$inventory.inventory.name', '$$cartItem.name'],
									}],
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

		console.log("hello")

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}
