import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

GMap.propTypes = {
	pickupLocation: PropTypes.any,
	destinationLocation: PropTypes.any,
}

export default function GMap({
	pickupLocation,
	destinationLocation,
}) {
	const [directions, setDirections] = useState(null)

	const [currentLocation, setCurrentLocation] = useState(null)

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const location = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					}
					setCurrentLocation(location)
				},
				() => {
					console.error('Error fetching the current location')
				}
			)
		}
	}, [])

	useEffect(() => {
		if (pickupLocation && destinationLocation) {
			const directionsService = new window.google.maps.DirectionsService()

			directionsService.route(
				{
					origin: pickupLocation,
					destination: destinationLocation,
					travelMode: window.google.maps.TravelMode.DRIVING,
				},
				(result, status) => {
					if (status === window.google.maps.DirectionsStatus.OK) {
						setDirections(result)
					} else {
						console.error(`Error fetching directions ${result}`)
					}
				}
			)
		}
	}, [pickupLocation, destinationLocation])

	const containerStyle = {
		width: '100%',
		height: '400px',
		margin: 'auto',
		borderRadius: '20px',
	}

	return (
		<>
			<GoogleMap
				center={
					directions ? directions.routes[0].bounds.getCenter() : currentLocation
				}
				zoom={15}
				mapContainerStyle={containerStyle}
				onLoad={() => console.log('Map loaded')}
			>
				{directions ? (
					<DirectionsRenderer directions={directions} />
				) : (
					currentLocation && <Marker position={currentLocation} />
				)}
			</GoogleMap>
		</>
	)
}
