import mongoose from 'mongoose'
import Booking from '../models/Booking.model.js'

export async function getBookings(req, res, next) {
	const id = new mongoose.Types.ObjectId(req.query.id)

	//FIXME: it can be completed, requested, inprogress, all
	const { status, role } = req.query
	//role must be taken from auth token
	try {
		let queryId = {}
		if (role === 'client') {
			queryId = { clientId: id }
		} else if (role === 'company') {
			queryId = { companyId: id }
		} else {
			throw new Error('wrong role')
		}

		let query = {}

		if (status === 'completed') {
			query = { status: 'completed' }
		} else if (status === 'inprogress') {
			query = { status: { $nin: ['completed', 'declined'] } }
		} else if (status === 'requested') {
			query = { status: 'requested' }
		}

		const result = await Booking.aggregate([
			{
				$match: {
					...queryId,
					...query,
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
					from: 'users',
					localField: 'clientId',
					foreignField: '_id',
					as: 'client',
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
				$unwind: '$company',
			},
			{
				$unwind: '$client',
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
					clientName: '$client.name',
					clientId: '$client._id',
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
