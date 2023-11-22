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
	const [selectedSupervisorId, setSelectedSupervisorId] = useState(null)

	const handleOnChange = (id) => {
		if (selectedEmployeeIds.includes(id)) {
			setSelectedEmployeeIds(
				selectedEmployeeIds.filter((employeeId) => employeeId !== id)
			)
			// If the deselected employee was the supervisor, clear the supervisor selection
			if (selectedSupervisorId === id) {
				setSelectedSupervisorId(null)
			}
		} else {
			setSelectedEmployeeIds([...selectedEmployeeIds, id])
		}
	}

	const handleSupervisorChange = (id) => {
		setSelectedSupervisorId(id)
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
					supervisorId: selectedSupervisorId,
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
					<p className="font-semibold">Supervisor</p>
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
						<div className="flex w-full">
							<strong className="font-semibold min-w-[12rem]">
								{employee.name}
							</strong>
						</div>
						<div className="w-full">
							<p>{employee.title}</p>
						</div>

						<div className="w-full text-center">
							<input
								type="checkbox"
								checked={selectedEmployeeIds.includes(employee._id)}
								onChange={() => handleOnChange(employee._id)}
							/>
						</div>
						<div className="w-full text-center">
							<input
								type="radio"
								name="supervisor"
								value={employee._id}
								required
								onChange={() => handleSupervisorChange(employee._id)}
								checked={selectedSupervisorId === employee._id}
								disabled={!selectedEmployeeIds.includes(employee._id)}
							/>
						</div>
					</div>
				))}

				<div className="flex justify-end items-center gap-3 my-3 mt-8">
					<Button onClick={() => setShowModal(false)}>Close</Button>
					{/* also check condition to must be the supervisor */}
					{employees.length > 0 &&
						selectedEmployeeIds.length > 0 &&
						selectedSupervisorId && <Button type="submit">Submit</Button>}
				</div>
			</form>
		</Modal>
	)
}
