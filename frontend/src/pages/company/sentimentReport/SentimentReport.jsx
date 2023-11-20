import { useEffect, useState } from 'react'
import Table from 'src/components/Table/Table.jsx'
import { useAuth } from 'src/context/AuthContext.jsx'

export default function SentimentReport() {
	const [bookings, setBookings] = useState([])
	const { user } = useAuth()

	const [sentimentCounts, setSentimentCounts] = useState({
		veryNegative: 0,
		negative: 0,
		neutral: 0,
		positive: 0,
		veryPositive: 0,
		total: 0,
	})

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/review/sentiment/report?companyId=${user._id}`
				)

				if (!response.ok) {
					throw new Error('Something went wrong')
				}
				const { data } = await response.json()

				const sentimentFrequency = {
					veryNegative: 0,
					negative: 0,
					neutral: 0,
					positive: 0,
					veryPositive: 0,
					total: 0,
				}

				const transformedData = data.map((booking, index) => {
					const sentimentScore = booking.review.sentimentScore

					let sentimentMessage
					if (sentimentScore <= -2) {
						sentimentMessage = 'very negative sentiment'
						sentimentFrequency.veryNegative++
					} else if (-2 < sentimentScore < -1) {
						sentimentMessage = 'negative sentiment'
						sentimentFrequency.negative++
					} else if (-1 <= sentimentScore <= 1) {
						sentimentMessage = 'neutral sentiment'
						sentimentFrequency.neutral++
					} else if (1 < sentimentScore < 2) {
						sentimentMessage = 'positive sentiment'
						sentimentFrequency.positive++
					} // sentimentScore >= 2
					else {
						sentimentMessage = 'very positive sentiment'
						sentimentFrequency.veryPositive++
					}

					return {
						sr: index + 1,
						clientName: booking.clientName,
						comment: booking.review.comment,
						sentimentScore: sentimentScore.toFixed(3),
						sentimentMessage: sentimentMessage,
						data: { sentimentScore },
					}
				})

				setBookings(transformedData)
				sentimentFrequency.total = transformedData.length
				setSentimentCounts(sentimentFrequency)
			} catch (e) {
				//FIXME: handle error
				console.log(e)
			}
		}

		fetchPrices()
	}, [user])

	return (
		<div className="mx-4">
			<div className="my-8 flex justify-center content-center">
				<h1 className="font-bold text-2xl">Total Reviews: </h1>
				<p className="px-4 text-2xl">{sentimentCounts.total}</p>
			</div>
			<div className="my-4 mb-[6rem] flex justify-center content-center">
				<div className="flex justify-center content-center bg-red-400 py-6 min-w-[18rem]">
					<h1 className="font-semibold text-2xl">Very Negative: </h1>
					<p className="px-4 text-2xl">{sentimentCounts.veryNegative}</p>
				</div>
				<div className="flex justify-center content-center  bg-red-300 py-6 min-w-[18rem]">
					<h1 className="font-semibold text-2xl">Negative: </h1>
					<p className="px-4 text-2xl">{sentimentCounts.negative}</p>
				</div>
				<div className="flex justify-center content-center bg-yellow-100 py-6 min-w-[18rem]">
					<h1 className="font-semibold text-2xl">Neutral: </h1>
					<p className="px-4 text-2xl">{sentimentCounts.neutral}</p>
				</div>
				<div className="flex justify-center content-center bg-green-200 py-6 min-w-[18rem]">
					<h1 className="font-semibold text-2xl">Positive Reviews: </h1>
					<p className="px-4 text-2xl">{sentimentCounts.positive}</p>
				</div>
				<div className="flex justify-center content-center bg-green-300 py-6 min-w-[18rem]">
					<h1 className="font-semibold text-2xl">Very Positive: </h1>
					<p className="px-4 text-2xl">{sentimentCounts.veryPositive}</p>
				</div>
			</div>
			<Table
				columns={[
					'Sr. ',
					'Client name',
					'Review',
					'Sentiment Score',
					'Sentiment Message',
				]}
				data={bookings}
				isSentiment={true}
			/>
		</div>
	)
}