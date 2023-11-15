import express from 'express'

import {
	getCompanyRequests,
	putCompanyRequest,
} from '../controllers/admin.controller.js'

const router = express.Router()

// router.get("/get/companies", getAllCompanies);
router.get('/companies-requests', getCompanyRequests)
router.put('/companies-requests', putCompanyRequest)

export { router as adminRoutes }
