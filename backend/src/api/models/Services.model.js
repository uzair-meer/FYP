import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	
})


const Service = mongoose.model('Service', ServiceSchema)

export default Service