import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      query: { userId },
    });
    setSocket(newSocket);
    console.log("in socket", userId);
    newSocket.emit("joinRoom", { userId });

    return () => newSocket.close();
  }, [userId]);

  return socket;
};
