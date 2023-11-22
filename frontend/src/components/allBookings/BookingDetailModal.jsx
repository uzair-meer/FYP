import { useState } from 'react'
import Button from 'src/components/Button/Button'
import Modal from 'src/components/Modal/Modal'

import PropTypes from 'prop-types'

BookingDetailModal.propTypes = {
	data: PropTypes.object,
}

export default function BookingDetailModal({ data }) {
	const [showModal, setShowModal] = useState(false)

	let total = 0

	data?.cart.forEach((item) => {
		const inventoryObj = data?.cart?.find(
			(inventoryItem) => inventoryItem.name === item.name.toLowerCase()
		)

		let subTotal = 0
		subTotal = data.services.includes('Packing')
			? subTotal + item.quantity * inventoryObj.packingPrice
			: subTotal
		subTotal = data.services.includes('Unpacking')
			? subTotal + item.quantity * inventoryObj.unpackingPrice
			: subTotal
		subTotal = data.services.includes('Shifting')
			? subTotal + item.quantity * inventoryObj.movingPrice
			: subTotal

		total += subTotal
	})

	return (
		<>
			<Button className="ml-3" onClick={() => setShowModal(true)}>
				View Detail
			</Button>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				className={'min-w-[70rem]'}
			>
				<div className="px-6 pt-6 pb-16">
					<div className="flex justify-between">
						<div className="flex flex-col w-full">
							<div className="flex flex-col">
								<h2 className="font-medium text-2xl">Company Name</h2>
								<p className="mt-3">{data.companyName}</p>
							</div>
							<h2 className=" mt-4 font-medium text-2xl">Destination</h2>
							<p className="my-3">
								{data.pickupAddress} - {data.destinationAddress}
							</p>
							<h2 className="font-medium text-2xl my-4">Services</h2>
							<div className="flex gap-4">
								{data.services.map((service, index) => (
									<Button key={`service-${index}`}>{service}</Button>
								))}
							</div>
						</div>
						<div className="flex flex-col items-end w-full">
							<div className="px-6 py-3 rounded-full bg-green-500">
								<p className="font-medium text-white">{data.status}</p>
							</div>
							<div className=" mt-6 flex flex-col p-2 px-6 bg-[#FFEFEE] w-[15rem] rounded-xl">
								<p className="font-bold text-primary">Total Cost</p>
								<p className="mt-6 text-right text-3xl">{total}</p>
							</div>
						</div>
					</div>
					<hr className="border-1 w-full my-8" />
					<table
						className=" table-fixed equal-cols w-full"
						style={{ '--num-cols': data.services.length + 3 }}
					>
						<thead>
							<tr>
								<th className="text-left text-xl font-medium">Item</th>
								<th className="text-left text-xl font-medium">Qty</th>
								{data.services.includes('Packing') && (
									<th className="text-left text-xl font-medium">
										Packing Price
									</th>
								)}
								{data.services.includes('Unpacking') && (
									<th className="text-left text-xl font-medium">
										UnPacking Price
									</th>
								)}
								{data.services.includes('Shifting') && (
									<th className="text-left text-xl font-medium">
										Shifting Price
									</th>
								)}
								<th className="text-left text-xl font-medium">Sub Total</th>
							</tr>
						</thead>
						<tbody>
							{data?.cart.map((item, index) => {
								const inventoryObj = data?.cart?.find(
									(inventoryItem) =>
										inventoryItem.name === item.name.toLowerCase()
								)

								let subTotal = 0
								subTotal = data.services.includes('Packing')
									? subTotal + item.quantity * inventoryObj.packingPrice
									: subTotal
								subTotal = data.services.includes('Unpacking')
									? subTotal + item.quantity * inventoryObj.unpackingPrice
									: subTotal
								subTotal = data.services.includes('Shifting')
									? subTotal + item.quantity * inventoryObj.movingPrice
									: subTotal

								return (
									<tr key={`trItem-${index}`}>
										<td className="pt-3">{item.name}</td>
										<td className="pt-3">{item.quantity}</td>
										{data.services.includes('Packing') && (
											<td className="text-left">{inventoryObj.packingPrice}</td>
										)}
										{data.services.includes('Unpacking') && (
											<td className="text-left">
												{inventoryObj.unpackingPrice}
											</td>
										)}
										{data.services.includes('Shifting') && (
											<td className="text-left">{inventoryObj.movingPrice}</td>
										)}
										<td className="text-left">{subTotal}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<div className="mt-6 text-end">
						<Button onClick={() => setShowModal(false)}>Close</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}
