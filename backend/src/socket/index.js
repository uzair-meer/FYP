// ./socket/index.js

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a specific room based on booking ID
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Leave a specific room
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    // Handle location updates
    socket.on("updateLocation", ({ location, roomId }) => {
      // Broadcast location to all clients in the room, except the sender
      socket.to(roomId).emit("driverLocationUpdate", location);
      console.log(`Location updated for room ${roomId}:`, location);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default setupSocket;
