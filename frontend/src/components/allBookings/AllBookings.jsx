import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { transformBookingData } from '../../helpers/booking.helper'
import Button from '../Button/Button'
import Table from '../Table/Table'
import BookingDetailModal from './BookingDetailModal'

AllBookings.propTypes = {
	bookingStatus: PropTypes.string,
}

export default function AllBookings({ bookingStatus }) {
	const { user } = useAuth()
	const [bookings, setBookings] = useState([])

	useEffect(() => {
		// if (user.role !== 'client') return

		const fetchReq = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/booking/all/?id=${user._id}&status=${bookingStatus}&role=${user.role}`
				)
				const result = await response.json()

				// console.log(result)
				if (result.status !== 'ok') {
					throw new Error('something wrong wiht api')
				}
				// console.log(result.data)
				const transformedData = transformBookingData(result.data, user)

				setBookings(transformedData)
			} catch (error) {
				//FIXME: handle error
				console.log(error)
			}
		}
		fetchReq()
	}, [user, bookingStatus])

	//TODO: decide what actions do option 1: navigate to detail page option 2: open model

	let components
	if (bookingStatus === 'all') {
		components = [
			{
				Component: BookingDetailModal,
			},
		]
	} else if (bookingStatus === 'inprogress') {
		components = [
			{
				Component: NavigateButton,
				
			},
		]
	}

	return (
		<div className="p-6">
			<h1 className="font-bold text-2xl my-6">
				{bookings.length > 0
					? `${bookingStatus} Bookings`
					: 'No Bookings right now. :)'}
			</h1>
			{bookings.length > 0 && (
				<Table
					data={bookings}
					columns={[
						'Sr. ',
						`${user.role === 'client' ? 'Company name' : 'Client name'}`,
						'Services',
						'Status',
						'Cost (in Rs)',
					]}
					isActions={true}
					components={components}
				/>
			)}
		</div>
	)
}

NavigateButton.propTypes = {
	data: PropTypes.object,
}

function NavigateButton({ data }) {
	const { user } = useAuth()
	const navigate = useNavigate()
	return (
		<Button onClick={() => navigate(`/${user.role}/booking/detail`, {state: data})}>
			View Detail
		</Button>
	)
}
