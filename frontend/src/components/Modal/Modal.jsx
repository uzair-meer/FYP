import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

Modal.propTypes = {
	showModal: PropTypes.bool,
	children: PropTypes.any,
	setShowModal: PropTypes.func,
	className: PropTypes.string,
}

export default function Modal({
	showModal,
	children,
	setShowModal,
	className = '',
}) {
	if (!showModal) return null

	return createPortal(
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className={`relative w-auto my-6 mx-auto max-w-3xl ${className}`}>
					{/*card*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						{/*content*/}
						{children}
					</div>
				</div>
			</div>
			<div
				onClick={() => setShowModal(false)}
				className="opacity-25 fixed inset-0 z-40 bg-black"
			></div>
		</>,
		document.getElementById('portal-root')
	)
}
