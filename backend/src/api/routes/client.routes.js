import express from 'express'
import {
	getAllBookings,
	getCompanyWithPrices,
	getCurrentBooking,
	getInprogressBookings,
	getReview,
	postBooking,
	postReview,
} from '../controllers/client.controller.js'

const router = express.Router()
router.post(`/booking`, postBooking)
router.get(`/select-company`, getCompanyWithPrices)
router.post(`/review`, postReview)
router.get(`/review`, getReview)
router.get(`/bookings`, getAllBookings)
router.get(`/current-booking`, getCurrentBooking)
router.get(`/inprogress-bookings`, getInprogressBookings)

export { router as clientRoutes }

//FIXME: add this middle ware in before getCompanyWithPrices
// Middleware to check if either products or services are missing
// const validateQueryParams = (req, res, next) => {
//   if (!req.query.products && !req.query.services) {
//     return next(new Error('Both products and services are missing.'));
//   }
//   next();
// };

// const h = [
// 	{
// 		companyId: 123, //bookings.companyId
// 		companyName: 'first company', //user._id where booking.companyId == user._id
// 		pickupAddress: 'johartown', //bookings.pickupAddress
// 		destinationAddress: 'kamoki', //bookings.destinationAddress
// 		status: 'inprogress', //bookings.status
// 		services: ['packing', 'moving'], //bookings.services
// 		cart: [
// 			{
// 				name: 'tv', //bookings.cart.name
// 				quantity: 4, //bookings.cart.quantity
// 				movingPrice: 134, //inventories.inventory.movingPrice
// 				packingPrice: 134, //inventories.inventory.packingPrice
// 				unpackingPrice: 134, //inventories.inventory.unpackingPrice
// 			},
// 			{
// 				name: 'sofa', //bookings.cart.name
// 				quantity: 4, //bookings.cart.quantity
// 				movingPrice: 134, //inventories.inventory.movingPrice
// 				packingPrice: 134, //inventories.inventory.packingPrice
// 				unpackingPrice: 134, //inventories.inventory.unpackingPrice
// 			},

// 		],
// 		inventoryId: 322, //bookings.inventoryId
// 		employees: ['hamza', 'seeb'], //user._id where booking.[employees] == user._id
// 		createdAt: 2023 - 12 - 21, //bookings.createdAt
// 	},
// ]

// const inventorySchema = new Schema({
// 	companyId: {
// 		type: Schema.Types.ObjectId,
// 		ref: 'User',
// 		required: true,
// 	},
// 	inventory: [
// 		{
// 			name: {
// 				type: String,
// 				required: true,
// 			},
// 			movingPrice: {
// 				type: Number,
// 				required: true,
// 			},
// 			packingPrice: {
// 				type: Number,
// 				required: true,
// 			},
// 			unpackingPrice: {
// 				type: Number,
// 				required: true,
// 			},
// 		},
// 	],
// 	createdAt: {
// 		type: Date,
// 		default: Date.now,
// 	},
// })

// const bookingSchema = new Schema({
// 	clientId: {
// 		type: Schema.Types.ObjectId,
// 		ref: 'User',
// 		required: true,
// 	},
// 	companyId: {
// 		type: Schema.Types.ObjectId,
// 		ref: 'User',
// 		required: true,
// 	},
// 	pickUpAddress: {
// 		type: String,
// 		required: true,
// 	},
// 	destinationAddress: {
// 		type: String,
// 	},
// 	status: {
// 		type: String,
// 		default: "requested"
// 	},
// 	services: {
// 		type: [String],
// 		required: true,
// 	},
// 	cart: [
// 		{
// 			name: {
// 				type: String,
// 				required: true,
// 			},
// 			quantity: {
// 				type: Number,
// 				required: true,
// 			},
// 		},
// 	],
// 	inventoryId: {
// 		//it should be the latest id of selected company
// 		type: Schema.Types.ObjectId,
// 		ref: 'Inventory',
// 		required: true,
// 	},
// 	employees: [
// 		{
// 			type: Schema.Types.ObjectId,
// 			ref: 'Employee',
// 		},
// 	],
// 	createdAt: {
// 		type: Date,
// 		default: Date.now,
// 	},
// })

// const userSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 	},
// 	role: {
// 		type: String,
// 		required: true,
// 	},
// 	phone: {
// 		type: String,
// 		required: true,
// 	},
// 	createdAt: {
// 		type: Date,
// 		default: Date.now,
// 	},
// })
