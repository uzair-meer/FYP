import BookingDetail from 'components/bookingDetail/BookingDetail'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'

export default function EmployeeDashboard() {
	const { user } = useAuth()
	const [booking, setBooking] = useState({})

	const statusChangeHandler = async (event) => {
		const statusValue = event.target.value

		if (!statusValue) {
			return
		}

		try {
			const response = await fetch(
				'http://localhost:5000/employee/booking/update/status',
				{
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'PUT',
					body: JSON.stringify({ bookingId: booking._id, status: statusValue }),
				}
			)

			const { data, status } = await response.json()
			console.log(data)
			if (status === 'ok') {
				setBooking((prev) => ({ ...prev, status: statusValue }))
			}
		} catch (error) {
			//FIXME: handle error
			console.log(error)
		}
	}

	useEffect(() => {
		const fetchRequest = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/employee/booking/current?employeeId=${user._id}`
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const { data } = await response.json()

				setBooking(data[0])
			} catch (error) {
				//FIXME: handle error and success
				console.log(error)
			}
		}

		fetchRequest()
	}, [user._id])

	if (!booking._id) {
		return (
			<div className="p-6">
				<h1 className="mt-8 font-bold text-2xl text-center">
					There is no latest booking you are free. :{')'}
				</h1>
			</div>
		)
	}

	// return <div>hello from employee dashboard</div>
	return (
		<BookingDetail
			data={booking}
			statusChangeHandler={statusChangeHandler}
			isSupervisor={booking.supervisorId === user._id}
		/>
	)
}
