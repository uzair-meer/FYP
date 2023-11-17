'use client'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'
import Modal from '../../../components/Modal/Modal'

AddEditEmployeeModal.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	setEmployees: PropTypes.func,
	data: PropTypes.any,
}

export default function AddEditEmployeeModal({
	showModal,
	setShowModal,
	setEmployees,
	data = undefined,
}) {
	const { user } = useAuth()
	const companyId = user?._id
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
		title: '',
		cnic: '',
	})

	useEffect(() => {
		if (data) {
			setFormData({
				name: data.name,
				email: data.email,
				password: '',
				phone: data.phone,
				title: data.title,
				cnic: data.cnic,
			})
		}
	}, [data])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		let employeeData = {
			...formData,
			companyId,
		}

		try {
			let url = `http://localhost:5000/company/add/employee`
			let method = 'POST'
			if (data) {
				url = `http://localhost:5000/company/put/employee`
				method = 'PUT'
				employeeData = {
					...formData,
					employeeId: data._id,
				}
			}

			const response = await fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(employeeData),
			})

			const result = await response.json()

			if (response.ok) {
				alert('Employee added:', result)
				// Handle successful response
				setShowModal(false)

				//?handle edit case
				if (data) {
					setEmployees((prevEmployees) => {
						return prevEmployees.map((employee) => {
							if (employee.data._id === data._id) {
								return {
									...employee,
									name: result.data.name,
									title: result.data.title,
									status: result.data.status,
									data: {
										...result.data,
									},
								}
							}
							return employee
						})
					})

					setFormData({
						name: result.data.name,
						email: result.data.email,
						password: result.data.password,
						phone: result.data.phone,
						title: result.data.title,
						cnic: result.data.cnic,
					})

					return
				}

				//?handle add case
				setEmployees((prevEmployees) => [
					...prevEmployees,
					{
						sr: prevEmployees.length + 1,
						name: result.data.name,
						title: result.data.title,
						status: result.data.status,
						data: {
							...result.data,
						},
					},
				])

				setFormData({
					name: '',
					email: '',
					password: '',
					phone: '',
					title: '',
					cnic: '',
				})
			} else {
				console.error('Failed to add employee:', result)
			}
		} catch (error) {
			console.error('Network error:', error)
		}
	}

	return (
		<Modal showModal={showModal} setShowModal={setShowModal}>
			<form onSubmit={handleSubmit} method="POST" className="lg:w-[40rem] p-6">
				<h1 className="font-bold text-3xl text-center">
					{data ? 'Edit Employee' : 'Add New Employee'}
				</h1>
				<div>
					<label className="inline-block my-2 font-medium">Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="block w-full bg-transparent p-2 border border-gray rounded-md"
						required
					/>
				</div>
				<div>
					<label className="inline-block my-2 font-medium">Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="block w-full bg-transparent p-2 border border-gray rounded-md"
						required
					/>
				</div>
				<div>
					<label className="inline-block my-2 font-medium">Password</label>
					<input
						type="password"
						name="password"
						minLength={3}
						value={formData.password}
						onChange={handleChange}
						className="block w-full bg-transparent p-2 border border-gray rounded-md"
						required
					/>
				</div>
				<div>
					<label className="inline-block my-2 font-medium">Phone</label>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="block w-full bg-transparent p-2 border border-gray rounded-md"
						required
					/>
				</div>
				<div>
					<label className="inline-block my-2 font-medium">CNIC</label>
					<input
						type="text"
						name="cnic"
						value={formData.cnic}
						onChange={handleChange}
						className="block w-full bg-transparent p-2 border border-gray rounded-md"
						required
					/>
				</div>
				<div>
					<label className="inline-block my-2 font-medium">Role</label>
					<select
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="block w-full bg-transparent border border-gray rounded-md"
					>
						<option value="">Select role</option>
						<option value="electrician">Electrician</option>
						<option value="driver">Driver</option>
						<option value="plumber">Plumber</option>
						<option value="other">Other</option>
					</select>
				</div>
				<button
					type="submit"
					className="mt-11 block border-0 w-full p-2 text-title-xsml bg-primary text-white font-semibold rounded-md"
				>
					{data ? 'Save Changes' : 'Add Employee'}
				</button>
				<button
					type="button"
					onClick={() => setShowModal(false)}
					className="block border-0 w-full p-2 text-title-xsml bg-gray-200 text-primary mt-4 font-semibold rounded-md"
				>
					Cancel
				</button>
			</form>
		</Modal>
	)
}
