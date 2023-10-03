import express from 'express'
import { postEmployee, deleteEmployee, putEmployee, getClientReviews, putClientReviews } from '../controllers/company.controller.js'

const router = express.Router()

const route = '/company'

router.post(`${route}/employee`, postEmployee)
router.delete(`${route}/employee`, deleteEmployee)
router.put(`${route}/employee`, putEmployee)
router.get(`${route}/client-reviews`, getClientReviews)
router.put(`${route}/client-reviews`, putClientReviews)

export { router as companyRoutes }
