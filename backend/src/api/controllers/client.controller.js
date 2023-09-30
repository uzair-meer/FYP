import Booking from '../models/Booking.model.js'
import Inventory from '../models/Inventory.model.js'

export async function postBooking(req, res, next) {
	const {
		clientId,
		companyId,
		pickUpAddress,
		destinationAddress,
		services,
		cart,
	} = req.body

	try {
		//get latest inventoryId from inventroy
		const inventoryId = await Inventory.findOne({ companyId })
			.select('_id')
			.sort({ createdAt: -1 })
			.exec()

		const booking = new Booking({
			clientId,
			companyId,
			pickUpAddress,
			destinationAddress,
			services,
			cart,
			inventoryId,
		})

		const result = await booking.save()

		res.status(200).json({
			status: 'ok',
			data: { ...result._doc }, //_doc contains that data freshly entered in db
		})
	} catch (error) {
		next(error)
	}
}
