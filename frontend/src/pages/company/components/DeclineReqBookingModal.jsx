import PropTypes from 'prop-types'
import Modal from '../../../components/Modal/Modal'

DeclineReqBookingModal.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	bookingId: PropTypes.string,
	setBookings: PropTypes.func,
}

export default function DeclineReqBookingModal({
	showModal,
	setShowModal,
	setBookings,
	bookingId,
}) {
	const submitHandler = async (event) => {
		event.preventDefault()

		const url = 'http://localhost:5000/company/booking/request/declined'
		try {
			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify({
					bookingId: bookingId,
				}),
			})
			const data = await response.json()

			console.log(data)

			if (data.status === 'ok') {
				setBookings((prevBookings) => {
					const filteredBookings = prevBookings.filter(
						(booking) => booking.data._id !== bookingId
					)

					return filteredBookings.map((booking, index) => ({
						...booking,
						sr: index + 1,
					}))
				})

				setShowModal(false)
			}
		} catch (error) {
			//FIXME: add message if error
			console.log(error)
		}
	}

	return (
		<Modal showModal={showModal} setShowModal={setShowModal}>
			<form onSubmit={submitHandler} className="lg:w-[30rem] p-6" method="POST">
				<h1 className="font-bold text-3xl text-center">Decline Request</h1>
				<p className="font-regular text-center mt-4">
					Are you sure you want to decline the booking request?
				</p>
				<button
					type="submit"
					className="mt-11 block border-0 w-full p-2 text-title-xsml bg-primary text-white font-semibold rounded-md"
				>
					Decline
				</button>
				<button
					type="button"
					onClick={() => setShowModal(false)}
					className="block border-0 w-full p-2 text-title-xsml bg-gray-200 text-primary mt-4 font-semibold rounded-md"
				>
					Cancel
				</button>
			</form>
		</Modal>
	)
}
