import Button from 'components/Button/Button'
import { useEffect, useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useAuth } from 'src/context/AuthContext.jsx'
import Table from '../../../components/Table/Table'
import DeleteItem from '../components/DeleteItem'
import { createTableData, generateColumnNames } from '../helper/item-table'

// const ITEMS = ['sofa', 'bed', 'oven', 'fridge']

export default function SetPrices() {
	const { user } = useAuth()
	const [selectedServices, setSelectedServices] = useState({
		packing: false,
		unpacking: false,
		moving: false,
	})

	const [tableData, setTableData] = useState({
		columns: ['Sr.', 'Item name'],
		data: [],
	})

	const [itemPrices, setItemPrices] = useState({
		name: '',
		packingPrice: '',
		unpackingPrice: '',
		movingPrice: '',
	})

	const [inventory, setInventory] = useState([])

	//fetch all company items
	const servicesChangeHandler = (event) => {
		const { name, checked } = event.target
		//FIXME: show warning on every change of service that you have to enter all products with new service again -> dont show if user is entering first time
		alert(
			'you have to update all prices for products once offered services changed'
		)
		setSelectedServices((prev) => ({ ...prev, [name]: checked }))
		//also reset all prices
		setItemPrices({
			name: '',
			packingPrice: '',
			unpackingPrice: '',
			movingPrice: '',
		})
	}

	const changeInputHandler = (e) => {
		const { name, value } = e.target
		// Check if the input is one of the price fields
		if (
			name === 'packingPrice' ||
			name === 'unpackingPrice' ||
			name === 'movingPrice'
		) {
			// Ensure the value is a number and greater than 0
			if (!isNaN(value) && Number(value) > 0) {
				setItemPrices({ ...itemPrices, [name]: value })
			}
		} else {
			// For other inputs like the select element, just check if it's not empty
			if (value.trim() !== '') {
				setItemPrices({ ...itemPrices, [name]: value.toLowerCase() })
			}
		}
	}

	const addItemSubmitHandler = (event) => {
		event.preventDefault()

		// Check if all prices are greater than 0
		if (
			itemPrices.packingPrice >= 0 &&
			itemPrices.unpackingPrice >= 0 &&
			itemPrices.movingPrice >= 0
		) {
			let url
			if (
				!!inventory[0]?.packingPrice === selectedServices.packing &&
				!!inventory[0]?.unpackingPrice === selectedServices.unpacking &&
				!!inventory[0]?.movingPrice === selectedServices.moving
			) {
				//? services match just update the inventory
				url = 'http://localhost:5000/company/inventory/update'
			} else {
				//? services dont match create new inventory
				url = 'http://localhost:5000/company/inventory/post'
			}

			const newInventoryObj = itemPrices
			//check if any price is empty string then convert it to 0
			for (const key in itemPrices) {
				//item name
				if (key !== 'name' && itemPrices[key] === '') {
					newInventoryObj[key] = 0
				}
			}
			const updateInventoryReq = async () => {
				try {
					const response = await fetch(url, {
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify({
							companyId: user._id,
							inventory: [newInventoryObj],
						}),
					})

					const result = await response.json()

					if (result.status === 'ok') {
						setSelectedServices({
							moving: !!result?.data[0]?.movingPrice,
							packing: !!result?.data[0]?.packingPrice,
							unpacking: !!result?.data[0]?.unpackingPrice,
						})

						const tableDataObjList = createTableData(result.data)
						const newColNames = generateColumnNames(result.data)

						setInventory(result.data)
						setTableData({ columns: newColNames, data: tableDataObjList })

						//clear inputs
						setItemPrices({
							name: '',
							packingPrice: '',
							unpackingPrice: '',
							movingPrice: '',
						})
						//FIXME: fix alert
					} else {
						//
						throw new Error('some thing wend wrong with api')
					}
				} catch (error) {
					//FIXME: handle error
					console.log(error)
				}
			}

			updateInventoryReq()
		} else {
			alert('All prices must be greater than 0.')
		}
	}

	useEffect(() => {
		const fetchRequest = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/company/inventory?companyId=${user._id}`
				)

				const { data, status } = await response.json()

				if (status !== 'ok') {
					throw new Error('something wrong')
				}

				setSelectedServices({
					moving: !!data[0]?.movingPrice,
					packing: !!data[0]?.packingPrice,
					unpacking: !!data[0]?.unpackingPrice,
				})

				const tableDataObjList = createTableData(data)
				const newColNames = generateColumnNames(data)

				const dataWithoutId = data.map(({ _id, ...rest }) => ({ ...rest }))

				setInventory(dataWithoutId)

				setTableData({ columns: newColNames, data: tableDataObjList })
			} catch (error) {
				//FIXME: handle error
				console.log(error)
			}
		}

		fetchRequest()
	}, [user._id])

	return (
		<div className="p-6">
			<h1 className="mt-8 font-bold text-3xl">Update Prices</h1>
			<div className="p-4 my-8 rounded-md bg-[#FFEFEE]">
				<h2 className="font-semibold text-2xl">Add Item</h2>
				<form onSubmit={addItemSubmitHandler} method="post">
					<h3 className="mt-8 mb-3 font-semibold text-xl">Services</h3>
					<div className="flex gap-16">
						<div className="flex gap-4">
							<label htmlFor="packing">Packing</label>
							<input
								onChange={servicesChangeHandler}
								checked={selectedServices.packing}
								type="checkbox"
								name="packing"
								id="packing"
							/>
						</div>
						<div className="flex gap-4">
							<label htmlFor="unpacking">Unpacking</label>
							<input
								onChange={servicesChangeHandler}
								checked={selectedServices.unpacking}
								type="checkbox"
								name="unpacking"
								id="unpacking"
							/>
						</div>
						<div className="flex gap-4">
							<label htmlFor="moving">Moving</label>
							<input
								onChange={servicesChangeHandler}
								checked={selectedServices.moving}
								type="checkbox"
								name="moving"
								id="moving"
							/>
						</div>
					</div>
					{/* items price */}
					{(selectedServices.packing ||
						selectedServices.unpacking ||
						selectedServices.moving) && (
						<>
							<h3 className="mt-8 mb-3 font-semibold text-xl">Set Price</h3>
							<div className="flex flex-col w-[15.5rem]">
								<label className="font-medium" htmlFor="item">
									Item
								</label>
								<select
									className="font-medium border-2 h-10"
									name="name"
									id="name"
									onChange={changeInputHandler}
									value={itemPrices.name}
									required
								>
									<option value="">Select Item</option>
									<option value="sofa">Sofa</option>
									<option value="bed">Bed</option>
									<option value="oven">Oven</option>
									<option value="fridge">Fridge</option>
								</select>
							</div>
							<div className="flex justify-start items-center gap-12">
								{selectedServices.packing && (
									<div className="flex flex-col">
										<label className="font-medium" htmlFor="packingPrice">
											Packing Price
										</label>
										<input
											className="border-2"
											type="number"
											name="packingPrice"
											id="packingPrice"
											value={itemPrices.packingPrice}
											onChange={changeInputHandler}
											required
											min={1}
										/>
									</div>
								)}
								{selectedServices.unpacking && (
									<div className="flex flex-col">
										<label className="font-medium" htmlFor="unpackingPrice">
											Unpacking Price
										</label>
										<input
											className="border-2"
											type="number"
											name="unpackingPrice"
											value={itemPrices.unpackingPrice}
											id="unpackingPrice"
											onChange={changeInputHandler}
											required
											min={1}
										/>
									</div>
								)}
								{selectedServices.moving && (
									<div className="flex flex-col">
										<label className="font-medium" htmlFor="movingPrice">
											Moving Price
										</label>
										<input
											className="border-2"
											type="number"
											name="movingPrice"
											value={itemPrices.movingPrice}
											id="movingPrice"
											onChange={changeInputHandler}
											required
											min={1}
										/>
									</div>
								)}

								<Button className="bg-white mt-5" type="submit">
									<FaCirclePlus className="text-[2.5rem] text-primary" />
								</Button>
							</div>
						</>
					)}
				</form>
			</div>

			{/* All Items */}
			<h2 className=" mt-20 mb-4 font-semibold text-2xl">Current Items</h2>
			<Table
				columns={tableData.columns}
				data={tableData.data}
				components={[
					{
						Component: DeleteItem,
						props: {
							setTableData: setTableData,
							setInventory: setInventory,
							inventory: inventory,
						},
					},
				]}
				isActions={true}
			/>
		</div>
	)
}
