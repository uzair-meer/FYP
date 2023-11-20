import Button from 'components/Button/Button'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import Modal from '../../../components/Modal/Modal'
import { createTableData, generateColumnNames } from '../helper/item-table'

EditItem.propTypes = {
	setTableData: PropTypes.func,
	setInventory: PropTypes.func,
	data: PropTypes.any,
	inventory: PropTypes.array,
}

export default function EditItem({
	setTableData,
	data,
	inventory,
	setInventory,
}) {
	const { user } = useAuth()
	const [showModal, setShowModal] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		packingPrice: 0,
		unpackingPrice: 0,
		movingPrice: 0,
	})

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
				setFormData((prev) => ({ ...prev, [name]: value }))
			}
		}
	}

	useEffect(() => {
		if (data) {
			setFormData({
				name: data.name,
				packingPrice: data.packingPrice,
				unpackingPrice: data.unpackingPrice,
				movingPrice: data.movingPrice,
			})
		}
	}, [data])

	const submitHandler = async (e) => {
		e.preventDefault()

		const updatedInventory = inventory.map((item) =>
			item.name === formData.name
				? { ...formData }
				: { ...item, _id: undefined }
		)

		try {
			const response = await fetch(
				'http://localhost:5000/company/inventory/post',
				{
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({
						companyId: user._id,
						inventory: updatedInventory,
					}),
				}
			)

			const result = await response.json()

			if (result.status === 'ok') {
				const tableDataObjList = createTableData(result.data)
				const newColNames = generateColumnNames(result.data)

				setInventory(result.data)
				setTableData({ columns: newColNames, data: tableDataObjList })

				//clear inputs
				setFormData({
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

	return (
		<>
			<Button onClick={() => setShowModal(true)}>Edit</Button>

			<Modal showModal={showModal} setShowModal={setShowModal}>
				<form
					onSubmit={submitHandler}
					method="POST"
					className="lg:w-[40rem] p-6"
				>
					<h1 className="font-bold text-3xl text-center">Edit Item</h1>
					<div>
						<label className="inline-block my-2 font-medium" htmlFor="name">
							Item
						</label>
						<select
							className="block w-full p-2 h-10 border border-gray rounded-md"
							name="name"
							id="name"
							value={formData.name}
							disabled
						>
							<option value="">Select Item</option>
							<option value="sofa">Sofa</option>
							<option value="bed">Bed</option>
							<option value="oven">Oven</option>
							<option value="fridge">Fridge</option>
						</select>
					</div>
					{!!data.packingPrice && (
						<div>
							<label
								htmlFor="packingPrice"
								className="inline-block my-2 font-medium"
							>
								Packing Price
							</label>
							<input
								type="number"
								name="packingPrice"
								id="packingPrice"
								value={formData.packingPrice}
								onChange={changeInputHandler}
								className="block w-full bg-transparent p-2 border border-gray rounded-md"
								required
								min={1}
							/>
						</div>
					)}
					{!!data.unpackingPrice && (
						<div>
							<label
								htmlFor="unpackingPrice"
								className="inline-block my-2 font-medium"
							>
								Unpacking Price
							</label>
							<input
								type="number"
								name="unpackingPrice"
								id="unpackingPrice"
								value={formData.unpackingPrice}
								onChange={changeInputHandler}
								className="block w-full bg-transparent p-2 border border-gray rounded-md"
								required
								min={1}
							/>
						</div>
					)}
					{!!data.movingPrice && (
						<div>
							<label
								htmlFor="movingPrice"
								className="inline-block my-2 font-medium"
							>
								Moving Price
							</label>
							<input
								type="number"
								name="movingPrice"
								id="movingPrice"
								value={formData.movingPrice}
								onChange={changeInputHandler}
								className="block w-full bg-transparent p-2 border border-gray rounded-md"
								required
								min={1}
							/>
						</div>
					)}

					<Button
						type="submit"
						className="mt-11 block border-0 w-full p-2 text-title-xs bg-primary text-white font-semibold rounded-md"
					>
						Edit Item
					</Button>
					<button
						type="button"
						onClick={() => setShowModal(false)}
						className="block border-0 w-full p-2 text-title-xsml bg-gray-200 text-primary mt-4 font-semibold rounded-md"
					>
						Cancel
					</button>
				</form>
			</Modal>
		</>
	)
}
