import ChatMessage from "../api/models/Chat.modal.js";

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Joining a specific room
    socket.on("join room", (roomId) => {
      console.log(`Socket ${socket.id} joining room ${roomId}`);
      socket.join(roomId);
    });

    // Handling chat messages
    socket.on("chat message", (data) => {
      const newMessage = new ChatMessage(data);
      newMessage.save().then(() => {
        // Emitting message to a specific room
        io.to(data.bookingId).emit("chat message", data);
      });
    });

    // Handling disconnections
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
