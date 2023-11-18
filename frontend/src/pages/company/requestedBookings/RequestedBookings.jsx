import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'
import Table from '../../../components/Table/Table'
import RequestedBookingDetail from '../components/RequestedBookingDetail'

export default function RequestedBookings() {
	const { user } = useAuth()
	const [bookings, setBookings] = useState([])
	const [employees, setEmployees] = useState([])

	// fetch free employees
	useEffect(() => {
		const getFreeEmployees = async () => {
			const resp = await fetch(
				`http://localhost:5000/company/get/free/employees?companyId=${user._id}`
			)
			const { data } = await resp.json()
			setEmployees(data)
		}
		getFreeEmployees()
	}, [user._id])

	//fetch all requested bookings
	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/company/booking-requests?companyId=${user._id}`
				)

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
						clientName: booking.clientName,
						services: booking.services.join(', '),
						grandTotal: grandTotal,
						data: booking,
					}
				})

				setBookings(transformedData)
			} catch (e) {
				//FIXME: handle error
				console.log(e)
			}
		}

		fetchPrices()
	}, [user])

	return (
		<div className="mx-4">
			<Table
				columns={['Sr. ', 'Client name', 'Services', 'Cost (in Rs)']}
				components={[
					{
						Component: RequestedBookingDetail,
						props: {
							setBookings: setBookings,
							employees: employees,
							setEmployees: setEmployees,
						},
					},
				]}
				data={bookings}
				enableRowToggle={true}
			/>
		</div>
	)
}
