import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

AutoCompleteInput.propTypes = {
	id: PropTypes.string,
	placeholder: PropTypes.string,
	onPlaceSelected: PropTypes.func,
	disabled: PropTypes.bool
}

export default function AutoCompleteInput({
	id,
	placeholder,
	onPlaceSelected,
	disabled=false
}) {
	const inputRef = useRef(null)
	const autocompleteRef = useRef(null)

	useEffect(() => {
		if (!window.google) return

		autocompleteRef.current = new window.google.maps.places.Autocomplete(
			inputRef.current
		)
		autocompleteRef.current.addListener('place_changed', () => {
			const place = autocompleteRef.current.getPlace()
			onPlaceSelected(place) // Ensure callback is used here
		})
	}, [onPlaceSelected])

	return (
		<input
			type="text"
			id={id}
			ref={inputRef}
			placeholder={placeholder}
			className="border rounded-md"
			disabled={disabled}
			required
		/>
	)
}
