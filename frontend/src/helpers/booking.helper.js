function calculateGrandTotal(booking) {
	let grandTotal = 0
	booking.cart.forEach((item) => {
		let subTotal = 0
		if (booking.services.includes('Packing')) {
			subTotal += item.quantity * item.packingPrice
		}
		if (booking.services.includes('Unpacking')) {
			subTotal += item.quantity * item.unpackingPrice
		}
		if (booking.services.includes('Shifting')) {
			subTotal += item.quantity * item.movingPrice
		}
		grandTotal += subTotal
	})
	return grandTotal
}

function transformBooking(booking, index, user) {
	const grandTotal = calculateGrandTotal(booking)

	if (user.role === 'client') {
		return {
			sr: index + 1,
			companyName: booking.companyName,
			services: booking.services.join(', '),
			status: booking.status,
			grandTotal,
			data: booking,
		}
	}
	return {
		sr: index + 1,
		clientName: booking.clientName,
		services: booking.services.join(', '),
		status: booking.status,
		grandTotal,
		data: booking,
	}
}

export function transformBookingData(data, user) {
	return data.map((booking, index) => transformBooking(booking, index, user))
}
