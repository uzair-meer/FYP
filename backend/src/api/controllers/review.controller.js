import mongoose from 'mongoose'
import Booking from '../models/Booking.model.js'
import { analyzeSentiment } from '../utils/sentimentAnalysis.js'

export const getSentimentReport = async (req, res, next) => {
	try {
		const companyId = new mongoose.Types.ObjectId(req.query.companyId)
		const result = await Booking.aggregate([
			{
				$match: {
					companyId,
					// status: 'completed',
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
				$match: {
					'review.0': { $exists: true }, // Ensures that the booking has a review
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

		//create sentiment on result
		const sentimentedResult = result.map((booking) => {
			const sentimentScore = analyzeSentiment(booking.review.comment)
			booking.review.sentimentScore = sentimentScore
			return booking
		})

		res.json({ status: 'ok', data: sentimentedResult })
	} catch (error) {
		next(error)
	}
}
