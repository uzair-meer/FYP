import Booking from '../models/Booking.model.js'
import Inventory from '../models/Inventory.model.js'
import Review from '../models/Review.model.js'
import mongoose from 'mongoose';

export async function postBooking(req, res, next) {
	const {
		clientId,
		companyId,
		pickUpAddress,
		destinationAddress,
		services,
		cart,
	} = req.body

	try {
		//get latest inventoryId from inventroy
		const inventoryId = await Inventory.findOne({ companyId })
			.select('_id')
			.sort({ createdAt: -1 })
			.exec()

		const booking = new Booking({
			clientId,
			companyId,
			pickUpAddress,
			destinationAddress,
			services,
			cart,
			inventoryId,
		})

		const result = await booking.save()

		res.status(200).json({
			status: 'ok',
			data: result._doc, //_doc contains that data freshly entered in db
		})
	} catch (error) {
		next(error)
	}
}

export async function getCompanyWithPrices(req, res, next) {
	const inventoryItems = req.query.inventoryItems.split(',')

	try {
		const result = await Inventory.aggregate([
			{
				$sort: { createdAt: -1 }, // Sort by createdAt in descending order to get the latest document
			},
			{
				$group: {
					_id: '$companyId', // Group by companyId
					latestInventory: { $first: '$$ROOT' }, // Get the first document in each group (the latest)
				},
			},
			{
				$lookup: {
					from: 'users', // The name of the User collection
					localField: '_id', //this is the _id in group stage as mongo wants every document uniquly identify so we have to assign new _id as we are removing preious one by grouping
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$project: {
					_id: 0, // Exclude _id field from the result
					companyId: '$_id',
					companyName: { $arrayElemAt: ['$user.name', 0] }, // Get the companyName from the user field
					inventory: {
						$map: {
							input: {
								$filter: {
									input: '$latestInventory.inventory',
									as: 'item',
									cond: {
										$in: ['$$item.name', inventoryItems], //[tv, sofa]it want its second argument to be a array to select only items whose values match
									},
								},
							},
							as: 'item',
							in: {
								name: '$$item.name',
								movingPrice: '$$item.movingPrice',
								packingPrice: '$$item.packingPrice',
								unpackingPrice: '$$item.unpackingPrice',
							},
						},
					},
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

export async function postReview(req, res, next) {
	const { bookingId, comment, rating } = req.body

	try {
		const review = new Review({
			_id: bookingId,
			comment,
			rating,
		})

		const result = await review.save()

		res.status(200).json({
			status: 'ok',
			data: result._doc,
		})
	} catch (error) {
		next(error)
	}
}

export async function getReview(req, res, next) {
	const clientId = new mongoose.Types.ObjectId("6518023f237f71d0a5423a12")

	try {
		const result = await Booking.aggregate([
			{
				$match: { clientId: clientId }
			},
			{
				$lookup: {
					from: 'users', // Replace with the actual name of the User collection
					localField: 'companyId',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$unwind: '$user'
			},
			{
				$lookup: {
					from: 'reviews', // Replace with the actual name of the Review collection
					localField: '_id',
					foreignField: '_id',
					as: 'review'
				}
			},
			{
				$unwind: '$review'
			},
			{
				$project: {
					companyId: 1,
					companyName: '$user.name',
					comment: '$review.comment',
					reply: '$review.reply',
					rating: '$review.rating',
					_id: 0 // Exclude _id field
				}
			}
		])

		res.status(200).json({
			status: 'ok',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}
