import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
	bookingId: {
		type: Schema.Types.ObjectId,
		ref: 'Booking',
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	reply: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})


const Review = mongoose.model('Review', reviewSchema)

export default Review
