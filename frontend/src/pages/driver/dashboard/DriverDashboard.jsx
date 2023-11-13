import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000') // Use environment variable for server URL
const updateInterval = 10000 // Location update frequency in milliseconds

export default function DriverDashboard() {
	useEffect(() => {
		socket.emit('joinRoom', { roomId: '123' })

		let intervalId
		const watchId = navigator.geolocation.watchPosition(
			({ coords }) => {
				// Function to emit location
				const emitLocation = () => {
					const location = { lat: coords.latitude, lng: coords.longitude }
					socket.emit('updateLocation', { location, roomId: '123' })
				}

				emitLocation() // Emit immediately on watch start
				intervalId = setInterval(emitLocation, updateInterval) // Set interval for repeated updates
			},
			(err) => console.error(err),
			{ enableHighAccuracy: true }
		)

		return () => {
			navigator.geolocation.clearWatch(watchId)
			clearInterval(intervalId) // Clear the interval on unmount
		}
	}, [])

	// Implement a method to stop tracking
	// const stopTracking = () => {
	// 	navigator.geolocation.clearWatch(watchId)
	// 	clearInterval(intervalId)
	// 	// Additional logic to notify server/client
	// }

	return (
		<div>
			<h1>Driver Dashboard</h1>
			{/* <button onClick={stopTracking}>Stop Tracking</button> */}
			{/* Optionally add UI to change update frequency */}
			{/* <input
                type="number"
                value={updateInterval}
                onChange={(e) => setUpdateInterval(Number(e.target.value))}
            /> */}
		</div>
	)
}
