import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from '../../../components/Button/Button'
import AddEditEmployeeModal from './AddEditEmployeeModal'

EditEmployee.propTypes = {
	setEmployees: PropTypes.func,
	data: PropTypes.any,
}

export default function EditEmployee({ setEmployees, data }) {
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<Button onClick={() => setShowModal(true)}>Edit</Button>
			<AddEditEmployeeModal
				setEmployees={setEmployees}
				showModal={showModal}
				setShowModal={setShowModal}
				data={data}
			/>
		</>
	)
}
