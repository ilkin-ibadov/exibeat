'use client'
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function useChatSocket(userId, onMessageReceived) {
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("chat-message", (data) => {
      onMessageReceived(data);
    });

    return () => {
      socket.off("chat-message");
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = ({ to, from, trackId, content }) => {
    socket.emit("chat-message", { to, from, trackId, content });
  };

  return { sendMessage };
}