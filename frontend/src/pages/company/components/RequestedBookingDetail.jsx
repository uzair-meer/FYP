import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import ApprovedReqBookingModal from './ApprovedReqBookingModal'
import DeclineReqBookingModal from './DeclineReqBookingModal'

RequestedBookingDetail.propTypes = {
	data: PropTypes.object,
	setBookings: PropTypes.func,
	employees: PropTypes.array,
	setEmployees: PropTypes.func,
}

export default function RequestedBookingDetail({
	data,
	setBookings,
	employees,
	setEmployees,
}) {
	let grandTotal = 0

	const [showApprovedReqModal, setShowApprovedReqModal] = useState(false)
	const [showDeclineReqModal, setShowDeclineReqModal] = useState(false)

	return (
		<div className="flex w-full flex-col bg-[#FFEFEE] p-5">
			<h2 className="font-bold">Leopard ltd</h2>
			<p>Ratings: 4.5</p>
			<h2 className="font-semibold mt-6">Details:</h2>
			<table
				className=" table-fixed equal-cols"
				style={{ '--num-cols': data.services.length + 3 }}
			>
				<thead>
					<tr>
						<th className="text-left font-medium">Item</th>
						<th className="text-left font-medium">Qty</th>
						{data.services.includes('Packing') && (
							<th className="text-left font-medium">Packing Price</th>
						)}
						{data.services.includes('Unpacking') && (
							<th className="text-left font-medium">UnPacking Price</th>
						)}
						{data.services.includes('Shifting') && (
							<th className="text-left font-medium">Shifting Price</th>
						)}
						<th className="text-left font-medium">Sub Total</th>
					</tr>
				</thead>
				<tbody>
					{data.cart?.map((item, index) => {
						let subTotal = 0
						subTotal = data.services.includes('Packing')
							? subTotal + item.quantity * item.packingPrice
							: subTotal
						subTotal = data.services.includes('Unpacking')
							? subTotal + item.quantity * item.unpackingPrice
							: subTotal
						subTotal = data.services.includes('Shifting')
							? subTotal + item.quantity * item.movingPrice
							: subTotal

						grandTotal += subTotal
						return (
							<tr key={`trItem-${index}`}>
								<td>{item.name}</td>
								<td>{item.quantity}</td>
								{data.services.includes('Packing') && (
									<td className="text-left">{item.packingPrice}</td>
								)}
								{data.services.includes('Unpacking') && (
									<td className="text-left">{item.unpackingPrice}</td>
								)}
								{data.services.includes('Shifting') && (
									<td className="text-left">{item.movingPrice}</td>
								)}
								<td className="text-left">{subTotal}</td>
							</tr>
						)
					})}
					<tr>
						{/* empty td is just for spacing and formating of table */}
						<td></td>
						<td></td>
						{data.services.map((service, index) => (
							<td key={`td-space-${index}`}></td>
						))}
						<td className="">
							<h2 className="font-medium mt-5">Grand Total: {grandTotal}</h2>
							<div className="mt-5 flex gap-5">
								<Button
									onClick={() => setShowDeclineReqModal(true)}
									className="self-end"
								>
									Decline
								</Button>
								<Button
									onClick={() => setShowApprovedReqModal(true)}
									className="self-end"
								>
									Approve
								</Button>

								<ApprovedReqBookingModal
									showModal={showApprovedReqModal}
									setShowModal={setShowApprovedReqModal}
									employees={employees}
									setEmployees={setEmployees}
									bookingId={data._id}
									setBookings={setBookings}
								/>

								<DeclineReqBookingModal
									showModal={showDeclineReqModal}
									setShowModal={setShowDeclineReqModal}
									bookingId={data._id}
									setBookings={setBookings}
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
