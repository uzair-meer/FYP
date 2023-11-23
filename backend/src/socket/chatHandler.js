import { saveChatMessage } from "../api/services/chat.services.js";

export const handleChatEvents = (socket, io) => {
  socket.on('joinRoom', ({ userId }) => {
    socket.join(userId);
  });

  socket.on('sendMessage', async (data) => {
    try {
      const { clientId, companyId, role, message } = data
      console.log(data)
      const result = await saveChatMessage({ clientId, recipientId: companyId, message, role });
      // its our choice to send only 1 message or full chat
      
      let room
      if (role === 'client') {
        room = companyId
      } else if (role === 'company') {
        room = clientId
      }

      console.log(result)

      io.to(room).emit('newMessage', result);

    } catch (error) {
      console.log(error, ' in socket io chatHandler')
    }
  });

  // ... other chat-related event handlers ...
};