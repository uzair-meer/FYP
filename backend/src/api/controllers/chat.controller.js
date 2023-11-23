import mongoose from 'mongoose'
import Chat from '../models/Chat.modal.js'
import User from '../models/User.model.js'
import { saveChatMessage } from '../services/chat.services.js'

//!client
//? side bar companies
export const getAllCompanies = async (req, res, next) => {
	try {
		const companies = await User.aggregate([
			{
				$match: { role: 'company' },
			},
			{
				$lookup: {
					from: 'companies', // The name of the Company collection
					localField: '_id',
					foreignField: '_id',
					as: 'companyData',
				},
			},
			{
				$unwind: '$companyData',
			},
			{
				$match: { 'companyData.status': 'approved' },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					email: 1,
					phone: 1,
				},
			},
		])

		res.status(200).json({ status: 'ok', data: companies })
	} catch (error) {
		next(error)
	}
}

//!company or employee //FIXME: receive role to make it work with employee as well i think it can handle all cases whether company, client, employee just we have to change local field
//? side bar clients
export const getAllClients = async (req, res, next) => {
	const companyId = new mongoose.Types.ObjectId(req.query.companyId)

	try {
		const result = await Chat.aggregate([
			{ $match: { companyId: companyId } },
			{
				$lookup: {
					from: 'users',
					localField: 'clientId',
					foreignField: '_id',
					as: 'userData',
				},
			},
			{
				$unwind: '$userData',
			},
			{
				$project: {
					name: '$userData.name',
					email: '$userData.email',
					phone: '$userData.phone',
					_id: '$userData._id',
					// messages: 1, // Include the entire messages array
					// lastUpdated: 1,
				},
			},
		])

		res.status(200).json({ status: 'ok', data: result })
	} catch (error) {
		next(error)
	}
}

//! message
export const postMessage = async (req, res, next) => {
	//FIXME: role must be taken from authToken as private field
	const { role, message, clientId, companyId } = req.body

	try {
		
		const result = await saveChatMessage({clientId, recipientId: companyId, role, message})

		res.status(200).json({ status: 'ok', data: message, result })
	} catch (error) {
		next(error)
	}
}

export const getAllMessages = async (req, res, next) => {
	try {
		//FIXME: this should also be received from auth token
		const { role, id } = req.query

		const objectId = new mongoose.Types.ObjectId(id)

		let query = {}
		let idKey
		if (role === 'client') {
			query = { clientId: objectId }
			idKey = 'companyId'
		} else if (role === 'company') {
			query = { companyId: objectId }
			idKey = 'clientId'
		} else {
			return res.status(400).json({ status: 'error', message: 'Invalid role' })
		}

		const chatData = await Chat.aggregate([
			{ $match: query },
			{
				$lookup: {
					from: 'users',
					localField: idKey,
					foreignField: '_id',
					as: 'userData',
				},
			},
			{
				$unwind: '$userData',
			},
			{
				$project: {
					name: '$userData.name',
					email: '$userData.email',
					phone: '$userData.phone',
					clientId: 1,
					companyId: 1,
					messages: 1, // Include the entire messages array
					lastUpdated: 1,
				},
			},
		])

		res.status(200).json({ status: 'ok', data: chatData })
	} catch (error) {
		next(error)
	}
}
