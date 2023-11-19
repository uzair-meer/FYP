import { useAuth } from 'src/context/AuthContext.jsx'
import CompletedBookings from 'src/components/completedBookings/CompletedBookings'

export default function ClientCompletedBookings() {
	const { user } = useAuth()

	return (
		<CompletedBookings
			fetchUrl={`http://localhost:5000/client/completed-bookings?clientId=${user._id}`}
			role={`${user.role}`}
		/>
	)
}
