import { saveChatMessage } from "../api/services/chat.services.js";

const ChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", ({ userId }) => {
      console.log("chat user", userId);
      console.log(userId);

      socket.join(userId);
      console.log("in chat socket");
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { clientId, companyId, role, message } = data;
        console.log(message);
        console.log(data);
        const result = await saveChatMessage({
          clientId,
          recipientId: companyId,
          message,
          role,
        });
        // its our choice to send only 1 message or full chat

        let room;
        if (role === "client") {
          room = companyId;
        } else if (role === "company") {
          room = clientId;
        }

        io.to(room).emit("newMessage", result);
      } catch (error) {
        console.log(error, " in socket io chatHandler");
      }
    });
  });

  // ... other chat-related event handlers ...
};
export default ChatSocket;
