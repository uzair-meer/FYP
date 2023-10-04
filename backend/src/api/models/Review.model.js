import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
	_id: {
		//because one booking can have only 1 review so it must be unique
		type: Schema.Types.ObjectId,
		ref: 'Booking',
		// unique: true, // it will show warning becase monogo ensures that _id must be unique so there is no need for this
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
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
