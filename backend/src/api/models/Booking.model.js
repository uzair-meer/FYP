import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookingSchema = new Schema({
	clientId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	companyId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	pickUpAddress: {
		type: String,
		required: true,
	},
	destinationAddress: {
		type: String,
	},
	services: {
		type: [String],
		required: true,
	},
	cart: [
		{
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	houseHoldInventoryId: {
		//it should be the latest id of selected company
		type: Schema.Types.ObjectId,
		ref: 'HouseHoldInventory',
		required: true,
	},
	employees: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Employee',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking