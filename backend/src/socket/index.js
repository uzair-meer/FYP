import { handleChatEvents } from './chatHandler.js'

const setupSocket = (io) => {
	io.on('connection', (socket) => {
		handleChatEvents(socket, io)

		//my socket.io code
		socket.on('joinRoom', ({ roomId }) => {
			socket.join(roomId)
		})

		socket.on('updateLocation', ({ location, roomId }) => {
			io.to(roomId).emit('updateLocationToClient', location)
		})

		socket.on('leaveRoom', ({ roomId }) => {
			socket.leave(roomId)
		})
	})
}

export default setupSocket
