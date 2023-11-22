import { useLocation } from 'react-router-dom'
import BookingDetail from '../../../components/bookingDetail/BookingDetail'

export default function CompanyBookingDetail() {
	const location = useLocation()
	const data = location.state

	if (!data) {
		return null
	}

	return <BookingDetail data={data} />
}
