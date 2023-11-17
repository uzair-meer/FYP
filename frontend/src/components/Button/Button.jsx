import PropTypes from 'prop-types'

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	attributes: PropTypes.any,
}

export default function Button({ className = '', children, ...attributes }) {
	const buttonClass = `px-3 py-2 text-white font-semibold rounded-full bg-primary ${className || ''}`

	return (
		<button className={buttonClass} {...attributes}>
			{children}
		</button>
	)
}
