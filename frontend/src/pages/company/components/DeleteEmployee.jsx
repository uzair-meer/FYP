import PropTypes from 'prop-types'
import { useState } from 'react'
import Modal from '../../../components/Modal/Modal'

DeleteEmployee.propTypes = {
	setEmployees: PropTypes.func,
	data: PropTypes.any,
}

export default function DeleteEmployee({ setEmployees, data }) {
	const [showModal, setShowModal] = useState(false)

	const submitHandler = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(
				`http://localhost:5000/company/delete/employee`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({employeeId: data._id}),
				}
			)

			const result = await response.json()

			if (response.ok) {
				alert('Employee deleted:', result)

				//?handle add case
				setEmployees((prevEmployees) => {
					// Filter out the employee ?Deletion here
					const filteredEmployees = prevEmployees.filter(
						(employee) => employee.data._id !== result.data._id
					)

					// Update the 'sr. no' for each remaining employee
					return filteredEmployees.map((employee, index) => ({
						...employee,
						sr: index + 1, // Assuming 'sr. no' should start from 1
					}))
				})

				setShowModal(false)
			} else {
				console.error('Failed to delet employee:', result)
			}
		} catch (error) {
			console.error('Network error:', error)
		}
	}

	return (
		<>
			<button className="ml-3" onClick={() => setShowModal(true)}>
				<svg
					width="30"
					height="32"
					viewBox="0 0 30 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.25 12.8889V23.7778M11.75 12.8889V23.7778M5.25 6.66667V25.0222C5.25 26.7646 5.25 27.6352 5.60423 28.3007C5.91582 28.8861 6.41264 29.363 7.02417 29.6612C7.7187 30 8.62836 30 10.445 30H19.555C21.3716 30 22.28 30 22.9745 29.6612C23.586 29.363 24.0845 28.8861 24.3961 28.3007C24.75 27.6358 24.75 26.766 24.75 25.027V6.66667M5.25 6.66667H8.5M5.25 6.66667H2M8.5 6.66667H21.5M8.5 6.66667C8.5 5.21707 8.5 4.49263 8.74739 3.9209C9.07725 3.15859 9.70952 2.55258 10.5059 2.23682C11.1031 2 11.8607 2 13.375 2H16.625C18.1393 2 18.8965 2 19.4937 2.23682C20.2901 2.55258 20.9226 3.15859 21.2524 3.9209C21.4998 4.49263 21.5 5.21707 21.5 6.66667M21.5 6.66667H24.75M24.75 6.66667H28"
						stroke="#E4503A"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>{' '}
			</button>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<form
					onSubmit={submitHandler}
					className="lg:w-[30rem] p-6"
					method="POST"
				>
					<h1 className="font-bold text-3xl text-center">Delete Employee</h1>
					<p className="font-regular text-center mt-4">
						Are you sure you want to delete the employee?
					</p>
					<button
						type="submit"
						className="mt-11 block border-0 w-full p-2 text-title-xsml bg-primary text-white font-semibold rounded-md"
					>
						Delete
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
		</>
	)
}
