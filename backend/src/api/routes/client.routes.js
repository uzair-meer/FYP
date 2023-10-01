import express from 'express'
import {
	getCompanyWithPrices,
	postBooking,
} from '../controllers/client.controller.js'

const router = express.Router()

const route = '/client'

router.post(`${route}/booking`, postBooking)
router.get(`${route}/select-company`, getCompanyWithPrices)

export { router as clientRoutes }


//FIXME: add this middle ware in before getCompanyWithPrices
// Middleware to check if either products or services are missing
// const validateQueryParams = (req, res, next) => {
//   if (!req.query.products && !req.query.services) {
//     return next(new Error('Both products and services are missing.'));
//   }
//   next();
// };