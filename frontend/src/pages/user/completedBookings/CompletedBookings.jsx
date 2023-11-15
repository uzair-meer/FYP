import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'
import CompletedBookingCard from './CompletedBookingCard'

export default function CompletedBookings() {
	const { user } = useAuth()
	const [bookings, setBookings] = useState([])
	// const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchRequest = async () => {
			try {
        console.log(user._id)
				const response = await fetch(
					`http://localhost:5000/client/completed-bookings?clientId=${user._id}`
				)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const result = await response.json()
				//FIXME: handle errors
				// console.log(result.data)
				setBookings(result.data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchRequest()
	}, [user._id])

	return (
		<div className="flex flex-wrap gap-5 p-5">
			{bookings &&
				bookings.map((booking) => (
					<CompletedBookingCard key={booking._id} booking={booking} setBookings={setBookings} />
				))}
		</div>
	)
}
