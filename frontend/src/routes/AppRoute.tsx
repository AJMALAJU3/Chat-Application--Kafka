import Chat from "@/pages/Chat";
import { ChatProvider } from "@/pages/ChatProvider";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/chat', element: <ChatProvider> <Chat/> </ChatProvider>}
])
