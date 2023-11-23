import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContext.jsx'
import { useServices } from 'src/context/UserContext.jsx'

ConfirmBooking.propTypes = {
	data: PropTypes.object,
	id: PropTypes.string,
}

export default function ConfirmBooking({ data, id }) {
	const navigate = useNavigate()

	const {
		selectedServices,
		destinationLocation,
		pickupLocation,
		items,
		setPickupLocation,
		setDestinationLocation,
		setSelectedServices,
		setItems,
	} = useServices()

	const { user } = useAuth()

	const cart = items.map((item) => ({
		...item,
		name: item.name.toLowerCase(),
	}))

	const placeOrderHandler = () => {
		const booking = {
			clientId: user._id,
			companyId: id,
			pickupAddress: pickupLocation,
			destinationAddress: destinationLocation,
			services: selectedServices,
			cart: cart,
		}

		const fetchRequest = async () => {
			const url = 'http://localhost:5000/client/booking'
			try {
				const response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify(booking),
				})

				const result = await response.json()

				if (result.status === 'ok') {
					// FIXME: also show some kind of success to user at this point
					result.data.cart.forEach((cartItem) => {
						const inventoryItem = data.inventory.find(
							(item) => item.name === cartItem.name
						)
						if (inventoryItem) {
							Object.assign(cartItem, inventoryItem)
						}
					})
					//clear context of cart
					setPickupLocation('')
					setDestinationLocation('')
					setSelectedServices([])
					setItems([])
					// console.log(result.data, 'updated data')

					navigate('/client/booking/detail', { state: result.data })
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchRequest()
	}

	let grandTotal = 0

	return (
		<div className="flex w-full flex-col bg-[#FFEFEE] p-5">
			<h2 className="font-bold">{data.companyName}</h2>
			{/* <p>Ratings: 4.5</p> */}
			<h2 className="font-semibold mt-6">Details:</h2>
			<p className="my-4">
				{pickupLocation} <span className="mx-4 mb-8">-</span>
				{destinationLocation}
			</p>
			<table
				className=" table-fixed equal-cols"
				style={{ '--num-cols': selectedServices.length + 3 }}
			>
				<thead>
					<tr>
						<th className="text-left font-medium">Item</th>
						<th className="text-left font-medium">Qty</th>
						{selectedServices.includes('Packing') && (
							<th className="text-left font-medium">Packing Price</th>
						)}
						{selectedServices.includes('Unpacking') && (
							<th className="text-left font-medium">UnPacking Price</th>
						)}
						{selectedServices.includes('Shifting') && (
							<th className="text-left font-medium">Shifting Price</th>
						)}
						<th className="text-left font-medium">Sub Total</th>
					</tr>
				</thead>
				<tbody>
					{items?.map((item, index) => {
						const inventoryObj = data?.inventory?.find(
							(inventoryItem) => inventoryItem.name === item.name.toLowerCase()
						)

						let subTotal = 0
						subTotal = selectedServices.includes('Packing')
							? subTotal + item.quantity * inventoryObj.packingPrice
							: subTotal
						subTotal = selectedServices.includes('Unpacking')
							? subTotal + item.quantity * inventoryObj.unpackingPrice
							: subTotal
						subTotal = selectedServices.includes('Shifting')
							? subTotal + item.quantity * inventoryObj.movingPrice
							: subTotal

						grandTotal += subTotal
						return (
							<tr key={`trItem-${index}`}>
								<td>{item.name}</td>
								<td>{item.quantity}</td>
								{selectedServices.includes('Packing') && (
									<td className="text-left">{inventoryObj.packingPrice}</td>
								)}
								{selectedServices.includes('Unpacking') && (
									<td className="text-left">{inventoryObj.unpackingPrice}</td>
								)}
								{selectedServices.includes('Shifting') && (
									<td className="text-left">{inventoryObj.movingPrice}</td>
								)}
								<td className="text-left">{subTotal}</td>
							</tr>
						)
					})}
					<tr>
						{/* empty td is just for spacing and formating of table */}
						<td></td>
						<td></td>
						{selectedServices.map((service, index) => (
							<td key={`td-space-${index}`}></td>
						))}
						<td className="">
							<h2 className="font-medium mt-5">Grand Total: {grandTotal}</h2>
							<button
								className="mt-7 px-3 py-2 self-end text-white font-semibold rounded-full bg-primary"
								type="button"
								onClick={placeOrderHandler.bind(this)}
							>
								Place Order
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
