import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

mongoose.set('strictQuery', true)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
	console.log('Connected to MongoDB')
})

export default db
