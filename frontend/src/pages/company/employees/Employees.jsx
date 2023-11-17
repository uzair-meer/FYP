import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'
import Button from '../../../components/Button/Button'
import Table from '../../../components/Table/Table'
import AddEditEmployeeModal from '../components/AddEditEmployeeModal'
import DeleteEmployee from '../components/DeleteEmployee'
import EditEmployee from '../components/EditEmployee'

export default function Employees() {
	const [employees, setEmployees] = useState([])
	const { user } = useAuth()
	const [showAddEmpModal, setShowAddEmpModal] = useState(false)

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/company/get/employees?companyId=${user._id}`
				)

				if (!response.ok) {
					throw new Error('Something went wrong')
				}
				const { data } = await response.json()

				const transformedData = data.map((employee, index) => ({
					sr: index + 1,
					name: employee.name,
					title: employee.title,
					status: employee.status,
					data: employee,
				}))

				setEmployees(transformedData)
			} catch (e) {
				//FIXME: handle error
				console.log(e)
			}
		}

		fetchPrices()
	}, [user._id])

	return (
		<>
			<div className="w-full p-5">
				<div className="flex justify-between">
					<h1 className="font-bold text-xl">Employees</h1>
					<Button type="button" onClick={() => setShowAddEmpModal(true)}>
						Add Employee
					</Button>
				</div>
				<div className="my-5 flex items-center border-2 rounded-lg w-80">
					{/* //FIXME: work on search bar with onchange change data array hardly 5 mint task */}
					<input
						type="text"
						placeholder="Search Employee"
						className="p-2 pl-4 w-full rounded-lg rounded-r-none"
					/>
					<span className="p-2 rounded-lg rounded-l-none">
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 15.5L21 21.5M10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5C17 14.366 13.866 17.5 10 17.5Z"
								stroke="#6A6A6A"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</div>
				<Table
					columns={['Sr.', 'Employee name', 'Designation', 'status']}
					data={employees}
					components={[
						{
							Component: EditEmployee,
							props: {
								setEmployees: setEmployees,
							},
						},
						{
							Component: DeleteEmployee,
							props: { setEmployees: setEmployees },
						},
					]}
					isActions={true}
				/>
			</div>
			<AddEditEmployeeModal
				setEmployees={setEmployees}
				showModal={showAddEmpModal}
				setShowModal={setShowAddEmpModal}
			/>
		</>
	)
}
