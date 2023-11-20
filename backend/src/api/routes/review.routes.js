import express from 'express'
import { getSentimentReport } from '../controllers/review.controller.js'

const router = express.Router()

router.get(`/sentiment/report`, getSentimentReport)

export { router as reviewRoutes }
