import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaCirclePlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useServices } from 'src/context/UserContext.jsx'
import {
	useLoadScript,
} from '@react-google-maps/api'
import AutoCompleteInput from '../../../components/googleMaps/AutoCompleteInput'
import GMap from '../../../components/googleMaps/GMap'

const stuff = [
	{ name: 'Bed' },
	{ name: 'Sofa' },
	{ name: 'Fridge' },
	{ name: 'Oven' },
]

const libraries = ['places']

export default function GetaQuote() {
	const {
		pickupLocation,
		setPickupLocation,
		destinationLocation,
		setDestinationLocation,
		selectedServices,
		setSelectedServices,
		items,
		setItems,
		// Add any additional state or methods you need from the context
	} = useServices()

	const navigate = useNavigate()

	const [selectedItem, setSelectedItem] = useState('') // contains drop down item only not quantity
	const [quantity, setQuantity] = useState('')

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyCaorXTBQtpCqvTDwKSZID-DMfOaNTewRY',
		libraries,
	})

	const onPickupPlaceSelected = (place) => {
		if (place.geometry) {
			setPickupLocation(place.formatted_address)
		}
	}

	const onDestinationPlaceSelected = (place) => {
		if (place.geometry) {
			setDestinationLocation(place.formatted_address)
		}
	}

	const handleServiceChange = (service) => {
		setSelectedServices((prevServices) =>
			prevServices.includes(service)
				? prevServices.filter((s) => s !== service)
				: [...prevServices, service]
		)
	}

	const handleAddItem = () => {
		if (
			!selectedItem ||
			quantity < 1 ||
			selectedItem === '' ||
			isNaN(quantity)
		) {
			alert('pls enter qunatity and select item')
			return
		}

		setItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.name === selectedItem)
			if (existingItem) {
				return prevItems.map((item) =>
					item.name === selectedItem
						? { ...item, quantity: item.quantity + quantity }
						: item
				)
			} else {
				return [...prevItems, { name: selectedItem, quantity }]
			}
		})

		// Reset selection and quantity
		setSelectedItem('')
		setQuantity('')
	}

	const handleRemoveItem = (index) => {
		setItems(items.filter((_, itemIndex) => itemIndex !== index))
	}

	const getQuote = () => {
		navigate('rates')
	}
	return (
		<>
			<div className="flex ">
				<form
					onSubmit={(e) => e.preventDefault()}
					className="w-[50%]  p-5 ml-4 border-r-[1px]"
				>
					<h1 className="text-headings font-bold">Get a Quote</h1>

					<div className="flex gap-5 mt-10">
						<div className="flex flex-col">
							<label htmlFor="pickupLocation">Pickup</label>
							<AutoCompleteInput
								id="pickupLocation"
								placeholder="Enter pickup location"
								onPlaceSelected={onPickupPlaceSelected}
								disabled={!isLoaded && loadError}
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="destinationLocation">Destination</label>
							<AutoCompleteInput
								id="destinationLocation"
								placeholder="Enter destination"
								onPlaceSelected={onDestinationPlaceSelected}
								disabled={!isLoaded && loadError}
							/>
						</div>
					</div>

					{/* services */}
					<div className="mt-8">
						<h2>Services</h2>
						<div className="flex mt-3 gap-10">
							<label className="">
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
							<label className="">
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
							<label className="">
								<input
									type="checkbox"
									name="services"
									className="mx-2"
									value="Unpacking"
									checked={selectedServices.includes('Unpacking')}
									onChange={() => handleServiceChange('Unpacking')}
								/>
								Unpacking
							</label>
						</div>
					</div>
					{/* items */}
					<div className="mt-6">
						<h2 className="my-2">Select Items</h2>
						<select
							onChange={(event) => setSelectedItem(event.target.value)}
							className="w-1/4 rounded-md border px-2 py-1"
							value={selectedItem}
						>
							<option value="">Select</option>
							{/* Add your item options here */}
							{stuff.map((item, index) => (
								<option value={item.name} key={`stuff-${index}`}>
									{item.name}
								</option>
							))}
						</select>
						<input
							type="number"
							placeholder="Qty"
							min={1}
							value={quantity}
							onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
							className="border rounded-md w-23 p-1 mx-2 ml-5"
						/>
						<FaCirclePlus
							onClick={handleAddItem}
							className="inline text-[1.6rem] mx-2 mb-1 cursor-pointer text-primary"
						/>
					</div>

					<div className="flex mt-[5rem]">
						{isLoaded && !loadError && (
							<GMap
								pickupLocation={pickupLocation}
								destinationLocation={destinationLocation}
							/>
						)}
					</div>
				</form>
				<div className=" flex flex-col m-10 ml-20 p-5 justify-between">
					{/* // locations */}
					<div>
						<h1 className="text-headings">
							Pickup<span className="px-11">-</span>Destination
						</h1>
						<div className="flex space-x-1 pb-3 mt-3 border-b-[1px]">
							{pickupLocation && (
								<>
									<p>{pickupLocation}</p>
									<p className="px-8">-</p>
								</>
							)}
							{destinationLocation && <p>{destinationLocation}</p>}
						</div>
					</div>
					{/* // selected services */}
					{selectedServices.length > 0 && (
						<div className="my-10 border-b-[1px] pb-5">
							<>
								<h1 className="text-headings mb-4">Services</h1>
								<div className="flex gap-5">
									{selectedServices.map((service) => (
										<h3
											className="px-4 py-1 rounded-full bg-primary text-white"
											key={service}
										>
											{service}
										</h3>
									))}
								</div>
							</>
						</div>
					)}
					{/* // items */}

					{items.length > 0 && (
						<>
							<div className="mt-10">
								<div className="flex justify-between mx-2 mb-2">
									<p className="text-primary">Item</p>
									<p className="text-primary">Qty</p>
									<p className="text-primary">Delete</p>
								</div>
								{items.map((item, index) => (
									<div
										className="flex justify-between mx-2 border-b-[1px] py-2 "
										key={index}
									>
										<p>{item.name}</p>
										<p>{item.quantity}</p>
										<AiOutlineDelete
											onClick={() => handleRemoveItem(index)}
											className="inline text-[1.3rem] mx-2 cursor-pointer text-primary"
										/>
									</div>
								))}
							</div>

							<button
								className="bg-primary m-auto px-10 font-bold py-2 my-10 rounded-full text-white self-end "
								onClick={getQuote}
							>
								Continue
							</button>
						</>
					)}
				</div>
			</div>
		</>
	)
}



