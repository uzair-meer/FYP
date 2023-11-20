import Button from 'components/Button/Button'
import { useEffect, useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useAuth } from 'src/context/AuthContext.jsx'
import Table from '../../../components/Table/Table'

const ITEMS = ['sofa', 'bed', 'oven', 'fridge']

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

	const [itemPrices, setItemPrices] = useState([])

	const [inventory, setInventory] = useState({})

	//fetch all company items
	const servicesChangeHandler = (event) => {
		const { name, checked } = event.target
		//FIXME: show warning on every change of service that you have to enter all products with new service again -> dont show if user is entering first time
		setSelectedServices((prev) => ({ ...prev, [name]: checked }))
	}

	const changeInputHandler = (e) => {
		const { name, value } = e.target
		setItemPrices({ ...itemPrices, [name]: value })
	}

	const addItemSubmitHandler = (event) => {
		event.preventDefault()

		console.log(itemPrices)
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

				setInventory(data)
				if (!data.length) {
					return
				}

				setSelectedServices({
					moving: !!data[0].movingPrice,
					packing: !!data[0].packingPrice,
					unpacking: !!data[0].unpackingPrice,
				})

				const tableDataObjList = data.map((item, index) => {
					const { _id, name, packingPrice, unpackingPrice, movingPrice } = item
					let obj = { sr: index + 1, name }
					if (packingPrice && packingPrice > 0) {
						obj = { ...obj, packingPrice }
					}
					if (unpackingPrice && unpackingPrice > 0) {
						obj = { ...obj, unpackingPrice }
					}
					if (movingPrice && movingPrice > 0) {
						obj = { ...obj, movingPrice }
					}
					obj = { ...obj, data: item }
					return obj
				})

				let newColNames = ['Sr.', 'Item name']
				if (data[0].packingPrice && data[0].packingPrice > 0) {
					newColNames = [...newColNames, 'Packing Price']
				}
				if (data[0].unpackingPrice && data[0].unpackingPrice > 0) {
					newColNames = [...newColNames, 'Unpacking Price']
				}
				if (data[0].movingPrice && data[0].movingPrice > 0) {
					newColNames = [...newColNames, 'Moving Price']
				}
				setTableData({ columns: newColNames, data: tableDataObjList })

				setInventory(data)
			} catch (error) {
				//FIXME: handle error
				console.log(error)
			}
		}

		fetchRequest()

		// const response = await fetch(url, {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	method: method,
		// 	body: JSON.stringify(body),
		// })
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
									name="item"
									id="item"
									onChange={changeInputHandler}
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
											type="text"
											name="packingPrice"
											id="packingPrice"
											onChange={changeInputHandler}
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
											type="text"
											name="unpackingPrice"
											id="unpackingPrice"
											onChange={changeInputHandler}
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
											type="text"
											name="movingPrice"
											id="movingPrice"
											onChange={changeInputHandler}
										/>
									</div>
								)}

								<Button className="bg-white mt-5" type="submit">
									<FaCirclePlus
										className="text-[2.5rem] text-primary"
									/>
								</Button>
							</div>
						</>
					)}
				</form>
			</div>

			{/* All Items */}
			<h2 className=" mt-20 mb-4 font-semibold text-2xl">Current Items</h2>
			<Table columns={tableData.columns} data={tableData.data} />
		</div>
	)
}
