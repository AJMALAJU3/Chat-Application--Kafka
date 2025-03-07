import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server; 

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", (chatId) => {
        console.log(chatId)
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on("sendMessage", ({ chatId, message }) => {
      console.log(`Message received for chat ${chatId}:`, message);
      io.to(chatId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getSocketInstance = () => {
  if (!io) throw new Error("Socket.io is not initialized!");
  return io;
};
