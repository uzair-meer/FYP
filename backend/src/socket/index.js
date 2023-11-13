const setupSocket = (io) => {
  
	io.on('connection', (socket) => {
    //FIXME: this line running very frequently check if this ok or a bug
    // console.log('socket.io connected')
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
