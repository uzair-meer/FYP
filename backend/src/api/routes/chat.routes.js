import express from 'express'
import {
	getAllClients,
	getAllCompanies,
	getAllMessages,
	postMessage,
} from '../controllers/chat.controller.js'

const router = express.Router()

router.get('/get/all/companies', getAllCompanies)
router.post('/post/message', postMessage)
router.get('/get/messages', getAllMessages)
router.get('/get/all/clients', getAllClients)

export { router as chatRoutes }
