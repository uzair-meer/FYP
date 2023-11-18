import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import Modal from '../../../components/Modal/Modal'

ApprovedReqBookingModal.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	setEmployees: PropTypes.func,
	employees: PropTypes.array,
	bookingId: PropTypes.string,
	setBookings: PropTypes.func,
}

export default function ApprovedReqBookingModal({
	showModal,
	setShowModal,
	setEmployees,
	employees,
	bookingId,
	setBookings,
}) {
	const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([])

	const handleOnChange = (id) => {
		if (selectedEmployeeIds.includes(id)) {
			setSelectedEmployeeIds(
				selectedEmployeeIds.filter((employeeId) => employeeId !== id)
			)
		} else {
			setSelectedEmployeeIds([...selectedEmployeeIds, id])
		}
	}

	const submitHandler = async (event) => {
		event.preventDefault()

		const url = 'http://localhost:5000/company/booking/request/approved'
		try {
			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify({
					bookingId: bookingId,
					employeeIds: selectedEmployeeIds,
				}),
			})
			const data = await response.json()

			console.log(data)

			if (data.status === 'ok') {
				setEmployees((prevEmployees) =>
					prevEmployees.filter(
						(employee) => !selectedEmployeeIds.includes(employee._id)
					)
				)

				setBookings((prevBookings) => {
					const filteredBookings = prevBookings.filter(
						(booking) => booking.data._id !== bookingId
					)

					return filteredBookings.map((booking, index) => ({
						...booking,
						sr: index + 1,
					}))
				})

				setShowModal(false)
			}
		} catch (error) {
			//FIXME: add message if error
			console.log(error)
		}
	}

	return (
		<Modal showModal={showModal} setShowModal={setShowModal}>
			<form onSubmit={submitHandler} method="POST" className="lg:w-[40rem] p-6">
				<h1 className="font-bold text-3xl text-center mb-10">
					Select Employees
				</h1>
				<div
					className={`flex items-center justify-between p-2 my-2 rounded-md`}
				>
					<div className="flex">
						<p className="font-semibold min-w-[12rem]">Name</p>
						<p className="font-semibold">Title</p>
					</div>
					<p className="font-semibold">Assign</p>
				</div>
				{employees?.map((employee, index) => (
					<div
						key={`emp-assing-${index}`}
						className={`flex items-center justify-between p-2 my-2 rounded-md ${
							selectedEmployeeIds.includes(employee._id)
								? 'bg-[#FFEFEE]'
								: 'bg-white'
						}`}
					>
						<div className="flex">
							<strong className="font-semibold min-w-[12rem]">
								{employee.name}
							</strong>
							<p>{employee.title}</p>
						</div>
						<input
							type="checkbox"
							checked={selectedEmployeeIds.includes(employee._id)}
							onChange={() => handleOnChange(employee._id)}
						/>
					</div>
				))}

				<div className="flex justify-end items-center gap-3 my-3 mt-8">
					<Button onClick={() => setShowModal(false)}>Close</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Modal>
	)
}
