

import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')
const updateInterval = 5000

export default function DriverDashboard() {
	useEffect(() => {
		socket.emit('joinRoom', { roomId: '123' })

		const emitLocation = (coords) => {
			const location = { lat: coords.latitude, lng: coords.longitude }
			console.log('Emitting location:', location) // Debugging log
			socket.emit('updateLocation', { location, roomId: '123' })
		}

		const watchId = navigator.geolocation.watchPosition(
			({ coords }) => {
				emitLocation(coords) // Emit immediately on watch start
			},
			(err) => console.error(err),
			{ enableHighAccuracy: true }
		)


		const intervalId = setInterval(() => {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => emitLocation(coords),
				(err) => console.error(err),
				{ enableHighAccuracy: true }
			)
		}, updateInterval)

		return () => {
			// console.log('discoonect')
			// navigator.geolocation.clearWatch(watchId)
			// clearInterval(intervalId)
			// socket.disconnect()
		}
	}, [])

	return (
		<div>
			<h1>Driver Dashboard</h1>
		</div>
	)
}
