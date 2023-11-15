import { useState } from 'react'
import PropTypes from 'prop-types'

CompletedBookingCard.propTypes = {
	booking: PropTypes.object, // Adjust according to the actual data shape
	setBookings: PropTypes.func,
}

export default function CompletedBookingCard({ booking, setBookings }) {
	const [showReview, setShowReview] = useState(false)
	const [reviewFormData, setReviewFormData] = useState({
		rating: 0,
		comment: '',
	})

	const onChangeHandler = (e) => {
		const { name, value } = e.target
		setReviewFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const submitHandler = async (event) => {
		event.preventDefault()
		//FIXME: handle error and success
		try {
			const response = await fetch('http://localhost:5000/client/review', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ bookingId: booking._id, ...reviewFormData }),
			})

			const result = await response.json()

			console.log(result)
			//TODO: tell some how parent that review added for now just add review field in parent in this booking id
			if (result.status !== 'ok')
				throw new Error('some error in review post api or on receiving side')

			setBookings((prevBookings) => {
				for (const prevBooking of prevBookings) {
					if (prevBooking._id === booking._id) {
						prevBooking.review = result.data
						break
					}
				}
				return prevBookings
			})

			setReviewFormData({
				rating: 0,
				comment: '',
			})
		} catch (error) {
			console.log(error)
		}
	}

	const calculateBill = () => {
		let totalPrice = 0
		// Iterate over each service
		booking.services.forEach((service) => {
			// Iterate over each item in the cart
			booking.cart.forEach((item) => {
				switch (service) {
					case 'packing':
						totalPrice += item.quantity * item.packingPrice
						break
					case 'unpacking':
						totalPrice += item.quantity * item.unpackingPrice
						break
					default:
						// Assuming default case is for movingPrice
						totalPrice += item.quantity * item.movingPrice
				}
			})
		})
		return totalPrice
	}

	return (
		<div key={booking._id}>
			<div className="flex flex-col justify-center items-center bg-secondary w-[20rem] p-5 rounded-[5px]">
				<h2 className="font-bold my-2">{booking.companyName}</h2>
				<div className="flex flex-col w-full items-center">
					{booking.cart.map((item, index) => {
						return (
							<div key={`cart-${index}`}>
								<p className="font-bold">{item.name}</p>
								{booking.services.includes('Packing') && (
									<div className="flex justify-between w-full">
										<p>{'Packing Price:'}</p>
										<p>{item.packingPrice}$</p>
									</div>
								)}
								{booking.services.includes('Unpacking') && (
									<div className="flex justify-between w-full">
										<p>{'Unpacking Price'}</p>
										<p>{item.unpackingPrice}$</p>
									</div>
								)}
								{booking.services.includes('Shifting') && (
									<div className="flex justify-between w-full">
										<p>{'Moving Price'}</p>
										<p>{item.movingPrice}$</p>
									</div>
								)}
							</div>
						)
					})}
				</div>
				<hr className="w-full h-[.1rem] bg-black m-5" />
				<div className="flex w-full justify-between">
					{`Total Price : ${calculateBill()}$`}
				</div>

				{booking.review && (
					<div className="my-3 flex w-full justify-between">
						<strong>Rating:</strong> {booking.review.rating} <br />
						<strong>Comment:</strong> {booking.review.comment}
					</div>
				)}

				{!booking.review && (
					<form onSubmit={submitHandler} className="flex flex-col">
						{/* FIXME: it should be five stars and user can select them */}

						{showReview && (
							<>
								<input
									className="my-3"
									type="number"
									placeholder="rating"
									min={1}
									max={5}
									required
									name="rating"
									id="rating"
									value={reviewFormData.rating}
									onChange={onChangeHandler}
								/>
								<textarea
									name="comment"
									placeholder="Share your experience"
									id=""
									cols="30"
									required
									rows="10"
									value={reviewFormData.comment}
									onChange={onChangeHandler}
								></textarea>
							</>
						)}

						<div className="flex mt-3">
							<button
								onClick={() => setShowReview((toggle) => !toggle)}
								className={`${
									showReview ? `bg-secondary` : `bg-primary`
								} text-black mx-3 rounded-[8px] px-2`}
								type="button"
							>
								{showReview ? 'close' : 'Add Review'}
							</button>

							{showReview && (
								<button
									className="bg-primary text-white rounded-[8px] px-2"
									type="submit"
								>
									Submit
								</button>
							)}
						</div>
					</form>
				)}
			</div>
		</div>
	)
}
