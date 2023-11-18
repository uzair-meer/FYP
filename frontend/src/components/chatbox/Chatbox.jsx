import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Adjust this URL to your server's address

const ChatBox = ({ bookingId, employeeId, clientId }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Join the room on component mount
    socket.emit("join room", bookingId);

    // Listen for chat messages
    socket.on("chat message", (msg) => {
      if (msg.bookingId === bookingId) {
        setChatHistory((prevHistory) => [...prevHistory, msg]);
      }
    });

    // Clean up on component unmount
    return () => {
      socket.off("chat message");
    };
  }, [bookingId]);

  const sendMessage = () => {
    if (currentMessage) {
      const messageData = {
        bookingId,
        employeeId,
        clientId,
        message: currentMessage,
        timestamp: new Date(),
      };
      socket.emit("chat message", messageData);
      setCurrentMessage("");
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
