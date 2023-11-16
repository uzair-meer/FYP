import { useEffect, useState } from 'react'
import Table from 'src/components/Table/Table.jsx'
import ConfirmBooking from '../components/ConfirmBooking'
import { useAuth } from 'src/context/AuthContext.jsx'
import AddReviewClient from '../components/AddReviewClient'


export default function CompletedBookings() {
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const { user } = useAuth()

	useEffect(() => {
		const fetchPrices = async () => {
			setIsLoading(true)
			try {
				const response = await fetch(`http://localhost:5000/client/completed-bookings?clientId=${user._id}`)

				if (!response.ok) {
					throw new Error('Something went wrong')
				}
				const { data } = await response.json()

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
	}, [user._id])

	return (
		<div className="mx-4">
			<Table
				columns={['Sr. ', 'Company name', 'Services', 'Cost (in Rs)']}
				components={[{ Component: AddReviewClient, props: {setBookings: setBookings} }]}
				enableRowToggle={true}
				data={bookings}
				idKey={'_id'} //booking._id //FIXME: didnt need that in our case test it without this
			/>
		</div>
	)
}
