import PropTypes from 'prop-types'
import { useState } from 'react'

AddReviewClient.propTypes = {
	data: PropTypes.object,
	id: PropTypes.string,
	setBookings: PropTypes.func,
}

//it is receiving bookingId by the way as {id} in prop
export default function AddReviewClient({ data, setBookings }) {
	const [reviewFormData, setReviewFormData] = useState({
		rating: data?.review?.rating || 0,
		comment: data?.review?.comment || '',
		isReview: !!data?.review?.comment,
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
				body: JSON.stringify({ bookingId: data._id, ...reviewFormData }),
			})

			const result = await response.json()

			console.log(result)

			if (!response.ok && result.status !== 'ok')
				throw new Error('some error in review post api or on receiving side')

			setBookings((prevBookings) => {
				return prevBookings.map((booking) => {
					if (booking.data._id === data._id) {
						return {
							...booking,
							data: {
								...booking.data,
								review: result.data,
							},
						}
					}
					return booking
				})
			})

			setReviewFormData({
				rating: result.data.rating,
				comment: result.data.comment,
				isReview: true,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form
			onSubmit={submitHandler}
			method="POST"
			className="rounded-xl flex w-full flex-col bg-[#FFEFEE] p-5"
		>
			<div>
				<strong>Ratings</strong>
				<input
					value={reviewFormData.rating}
					onChange={onChangeHandler}
					type="number"
					name="rating"
					id="rating"
					disabled={reviewFormData.isReview}
					placeholder="rating"
				/>
			</div>
			<textarea
				value={reviewFormData.comment}
				onChange={onChangeHandler}
				placeholder="Write a Review..."
				className="px-5 py-3 mt-5 rounded-xl"
				name="comment"
				id="comment"
				cols="30"
				rows="6"
				disabled={reviewFormData.isReview}
			></textarea>
			{!reviewFormData.isReview && (
				<button
					className="mt-5 w-40 self-end px-3 py-2 text-white font-semibold rounded-full bg-primary"
					type="submit"
				>
					Add Review
				</button>
			)}
		</form>
	)
}
