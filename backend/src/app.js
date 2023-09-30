import express from "express";
import cors from "cors"
import 'dotenv/config'

const app = express()
app.use(cors())

// * Routes

//? Express Error Middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	console.log('in express error middleware', error, 'in the end')
	const status = error.status || 500
	const message = error.message || 'server internal error'

	res.status(status).json({ status: 'error', message: message })
})

app.listen(process.env.PORT, () =>
	console.log(`server is running on port ${process.env.PORT}`)
)