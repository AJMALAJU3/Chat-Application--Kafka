import { useSelector } from "react-redux";
import { ChatContextType, IChat, Message, User } from "./Interface";
import { createContext, ReactNode, useEffect, useState } from "react"
import { RootState } from "@/store/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";


const fetchUserChats = async (userId: string) => {
  console.log(userId)
  const response = await axiosInstance.get(`/chat/user/${userId}`);
  console.log(response)
  if (!response) {
    throw new Error("Failed to fetch chats");
  }
  return response.data;
};


const fetchMessages = async (chatId: string) => {
  const { data } = await axiosInstance.get(`/message/messages/${chatId}`);
  return data;
};
 
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const userId = useSelector((state: RootState) => state.user._id)
  
    const { data } = useQuery({
      queryKey: ['fetch-chats', userId],
      queryFn: () => fetchUserChats(userId!),
      enabled: !!userId
    })
  
    const [chats, setChats] = useState<IChat[]>([])
    const [selectedChat, setSelectedChat] = useState<{chatId: string, messages: any} | null>(null);
    const queryClient = useQueryClient();

    const selectChat = async (chatId: string) => {
      try {
        const messages = await queryClient.fetchQuery({
          queryKey: ["messages", chatId],
          queryFn: () => fetchMessages(chatId),
        });
  
        setSelectedChat({ chatId, messages }); 
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    useEffect(() => {
      if (data) {
        setChats(data ?? []);
      }
    }, [data]);
  
  
  
    const addMessage = (message: any) => {
      setSelectedChat(prev => prev ? { 
        ...prev, 
        messages: [...prev.messages, message] 
      } : null);
    };
    
    // setUsers(prevUsers =>
    //   prevUsers.map(user =>
    //     user.id === userId
    //       ? {
    //         ...user,
    //         // messages: [...user.messages, message],
    //         lastMessage: message.text,
    //         unreadCount: user.id !== selectedUser?.id ? user.unreadCount + 1 : user.unreadCount
    //       }
    //       : user
    //   )
    // );
  
    return (
      <ChatContext.Provider value={{ chats, addMessage, selectedChat, selectChat }}>
        {children}
      </ChatContext.Provider>
    );
  };
  