import mongoose from 'mongoose'

const Schema = mongoose.Schema

const employeeSchema = new Schema({
	_id: {
		//this is basically employeeId
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	companyId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})


const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
