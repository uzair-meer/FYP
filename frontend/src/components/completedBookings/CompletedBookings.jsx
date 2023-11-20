import { useEffect, useState } from 'react'
import Table from 'src/components/Table/Table.jsx'

import PropTypes from 'prop-types'
import AddReview from './AddReview'

CompletedBookings.propTypes = {
	fetchUrl: PropTypes.string,
	role: PropTypes.string,
}

export default function CompletedBookings({ fetchUrl, role }) {
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchPrices = async () => {
			setIsLoading(true)
			try {
				const response = await fetch(fetchUrl)

				if (!response.ok) {
					throw new Error('Something went wrong')
				}
				const { data } = await response.json()

				console.log(data)

				const transformedData = data.map((booking, index) => {
					let grandTotal = 0

					booking.cart.forEach((item) => {
						let subTotal = 0

						subTotal = booking.services.includes('Packing')
							? subTotal + item.quantity * item.packingPrice
							: subTotal
						subTotal = booking.services.includes('Unpacking')
							? subTotal + item.quantity * item.unpackingPrice
							: subTotal
						subTotal = booking.services.includes('Shifting')
							? subTotal + item.quantity * item.movingPrice
							: subTotal

						grandTotal += subTotal
					})

					if (role === 'company') {
						return {
							sr: index + 1,
							clientName: booking.clientName,
							services: booking.services.join(', '),
							grandTotal: grandTotal,
							data: booking,
						}
					}

					return {
						sr: index + 1,
						companyName: booking.companyName,
						services: booking.services.join(', '),
						grandTotal: grandTotal,
						data: booking,
					}
				})

				setBookings(transformedData)
			} finally {
				setIsLoading(false)
			}
		}

		fetchPrices()
	}, [fetchUrl, role])

	if (!bookings.length) {
		return (
			<div className="px-4 mt-8">
				<h1 className="text-center font-bold text-2xl">
					No completed Bookings. :{')'}
				</h1>
			</div>
		)
	}

	return (
		<div className="px-4">
			<Table
				columns={[
					'Sr. ',
					`${role === 'company' ? 'Client name' : 'Company name'}`,
					'Services',
					'Cost (in Rs)',
				]}
				components={[
					{
						Component: AddReview,
						props: { setBookings: setBookings, role: role },
					},
				]}
				enableRowToggle={true}
				data={bookings}
				idKey={'_id'} //booking._id //FIXME: didnt need that in our case test it without this
			/>
		</div>
	)
}
