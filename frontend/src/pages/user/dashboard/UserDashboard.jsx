// import Services from 'src/pages/services/Services'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

export default function UserDashboard() {
	const [driverLocation, setDriverLocation] = useState(null)

	useEffect(() => {
		socket.emit('joinRoom', { roomId: '123' })

		socket.on('updateLocationToClient', (location) => {
			console.log(location)
			setDriverLocation(location)
		})

		// Cleanup function
		return () => {
			socket.off('locationUpdate')
			socket.disconnect()
		}
	}, [])

	return (
		<>
			<div>user dashboard</div>
			{/* <LoadScript googleMapsApiKey={"YOUR_API_KEY"} libraries={['places']}>
                <GoogleMap center={driverLocation || { lat: 0, lng: 0 }} zoom={15}>
                    {driverLocation && <Marker position={driverLocation} />}
                </GoogleMap>
            </LoadScript> */}
		</>
	)
}
