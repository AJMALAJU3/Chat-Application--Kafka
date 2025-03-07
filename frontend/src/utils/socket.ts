import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
let socket: Socket | null = null;

export const connectSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, { transports: ["websocket"] });

        socket.on("connect", () => {
            console.log("✅ Connected to Socket.IO:", socket?.id);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from Socket.IO");
        });

        socket.on("newMessage", (message) => {
            console.log("📩 New message received:", message);
        });

        socket.on("userTyping", (data) => {
            console.log("✍️ User is typing:", data);
        });

        socket.on("userStoppedTyping", (data) => {
            console.log("🛑 User stopped typing:", data);
        });

        socket.on("chatRead", (data) => {
            console.log("👀 Chat marked as read:", data);
        });

        socket.on("userOnline", (userId) => {
            console.log("🟢 User online:", userId);
        });

        socket.on("userOffline", (userId) => {
            console.log("🔴 User offline:", userId);
        });

        socket.on("chatJoined", (chatId: string) => {
            console.log("👥 Joined chat:", chatId);
        });

    }
    return socket;
};

export const getSocket = (): Socket => {
    if (!socket) throw new Error("❌ Socket is not initialized!");
    return socket;
};

export const sendMessage = (message: any) => {
    getSocket().emit("sendMessage", message);
};

export const startTyping = (chatId: string, userId: string) => {
    getSocket().emit("startTyping", { chatId, userId });
};

export const stopTyping = (chatId: string, userId: string) => {
    getSocket().emit("stopTyping", { chatId, userId });
};

export const markChatAsRead = (chatId: string, userId: string) => {
    getSocket().emit("markChatAsRead", { chatId, userId });
};

export const joinChat = (chatId: string) => {
    getSocket().emit("joinChat",  chatId );
};

export const leaveChat = (chatId: string, userId: string) => {
    getSocket().emit("leaveChat", { chatId, userId });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
