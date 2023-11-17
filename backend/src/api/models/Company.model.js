import mongoose from 'mongoose'

const Schema = mongoose.Schema

const companySchema = new Schema({
	_id: {
		//this is basically company_id
		type: Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
		required: true,
	},
	status: {
		// can be approved or declined or banned
		type: String,
		default: 'requested',
	},
	ntn: {
		type: String,
		require: true,
	},
	title: {
		type: String,
	},
	about: {
		type: String,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Company = mongoose.model('Company', companySchema)

export default Company
