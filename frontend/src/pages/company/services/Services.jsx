import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Autocomplete } from '@react-google-maps/api'
import { AiOutlineDelete } from 'react-icons/ai'
import Layout from '../../../layout/Layout'
import ConfirmQuoteModal from '../components/ConfirmQuoteModal'

const data = {
	destination: "Johar Town, Lhr - People's Colony, Fsd",
	services: ['Resdential Moving', 'Packing'],
	items: [
		{ name: 'sofa', variance: '5 seater', price: 10, quantity: 5 },
		{ name: 'bed', variance: 'king size', price: 100, quantity: 2 },
	],
}

function Services() {
	const stuff = [
		{ name: 'bed', price: 20 },
		{ name: 'sofa', price: 10 },
		{ name: 'fridge', price: 5 },
		{ name: 'oven', price: 30 },
	]

	const [pickupLocation, setPickupLocation] = useState('')
	const [destinationLocation, setDestinationLocation] = useState('')
	const [selectedServices, setSelectedServices] = useState([])
	const [items, setItems] = useState([])
	const [stuffItem, setStuffItem] = useState('')
	const [quantity, setQuantity] = useState('')
	const [showConfirmQuoteModal, setShowConfirmQuoteModal] = useState(false)

	const handleServiceChange = (service) => {
		setSelectedServices((prevServices) =>
			prevServices.includes(service)
				? prevServices.filter((s) => s !== service)
				: [...prevServices, service]
		)
	}

	const handleAddItem = () => {
		const stuffItemObj = stuff.find((item) => item.name === stuffItem)
		setItems((prevItems) => [
			...prevItems,
			{ ...stuffItemObj, quantity: +quantity },
		])

		// if (selectedItem && quantity) {

		// }
	}

	const handleRemoveItem = (index) => {
		const updatedItems = [...items]
		updatedItems.splice(index, 1)
		setItems(updatedItems)
	}
	const getQuote = () => {
		setShowConfirmQuoteModal(true)
		// navigate('get/quote', { state: { pickupLocation, destinationLocation } })
	}

	return (
		<Layout>
			<div className="flex">
				<form
					onSubmit={(e) => e.preventDefault()}
					action=""
					className="w-[60%]  p-5"
				>
					<h1 className="text-headings">Get a Moving Quote</h1>

					<div className="flex gap-5 my-2">
						<div>
							<label htmlFor="pickupLocation">Pickup :</label>
							<input
								type="text"
								id="pickupLocation"
								value={pickupLocation}
								onChange={(e) => setPickupLocation(e.target.value)}
								className="border"
								required
							/>
						</div>
						<div>
							<label htmlFor="destinationLocation">Destination:</label>
							<input
								type="text"
								id="destinationLocation"
								value={destinationLocation}
								onChange={(e) => setDestinationLocation(e.target.value)}
								className="border"
								required
							/>
						</div>
					</div>

					{/* services */}
					<div className="my-2">
						<h2>Select Services:</h2>
						<label>
							<input
								type="checkbox"
								name="services"
								value="Shifting"
								className="mx-2"
								checked={selectedServices.includes('Shifting')}
								onChange={() => handleServiceChange('Shifting')}
							/>
							Shifting
						</label>
						<label>
							<input
								type="checkbox"
								name="services"
								value="Packing"
								className="mx-2"
								checked={selectedServices.includes('Packing')}
								onChange={() => handleServiceChange('Packing')}
							/>
							Packing
						</label>
						<label>
							<input
								type="checkbox"
								name="services"
								className="mx-2 "
								value="Unpacking"
								checked={selectedServices.includes('Unpacking')}
								onChange={() => handleServiceChange('Unpacking')}
							/>
							Unpacking
						</label>
					</div>
					{/* items */}
					<div className="my-2">
						<h2 className="my-2">Select Items to Move:</h2>
						<select
							onChange={(e) => setStuffItem(e.target.value)}
							className="border px-2 py-1"
						>
							<option value=""> items</option>
							{/* Add your item options here */}
							{stuff.map((item, index) => (
								<option value={item.name} key={`stuff-${index}`}>
									{item.name}
								</option>
							))}
						</select>
						<input
							type="number"
							placeholder="No"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							className="border w-[3rem] p-1 mx-2"
						/>
						<button
							type="button"
							onClick={handleAddItem}
							className="border p-1 bg-[green] text-white"
						>
							Add Item
						</button>
					</div>
					<button className="bg-primary p-1 my-2 text-white" onClick={getQuote}>
						Get Quote
					</button>
				</form>

				<div className=" p-5">
					{/* // locations */}
					<div>
						{pickupLocation && (
							<>
								<h1 className="text-paragrah">Pickup: </h1>
								<p>{pickupLocation}</p>
							</>
						)}
						{destinationLocation && (
							<>
								<h1 className="text-paragrah  my-1">Destination:</h1>
								<p>{destinationLocation}</p>
							</>
						)}
					</div>
					{/* // selected services */}
					<div className="my-2">
						{selectedServices.length > 0 && (
							<>
								<h1 className="text-paragraph ">selected services</h1>
								<div className="flex gap-5">
									{selectedServices.map((service) => (
										<h3
											className="p-2 rounded-full bg-primary text-white"
											key={service}
										>
											{service}
										</h3>
									))}
								</div>
							</>
						)}
					</div>
					{/* // items */}
					<div>
						{items.map((item, index) => (
							<div key={index}>
								No of {item.name} : {item.quantity}
								<AiOutlineDelete
									onClick={() => handleRemoveItem(index)}
									className="inline text-[1.3rem] mx-2 cursor-pointer text-primary"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<ConfirmQuoteModal
				data={{
					destination: destinationLocation,
					services: selectedServices,
					items: items,
				}}
				showModal={showConfirmQuoteModal}
				setToggle={setShowConfirmQuoteModal}
			/>
		</Layout>
	)
}

export default Services
