import React, { createContext, useState, useContext, ReactNode } from 'react';
import Sidebar from './SideBar';
import ChatWindow from './ChatWindow';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp?: Date;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

interface ChatContextType {
  users: User[];
  selectedUser: User | null;
  selectUser: (user: User | null) => void;
  addMessage: (userId: number, message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      name: 'John Doe', 
      avatar: '/api/placeholder/50/50', 
      lastMessage: 'Hey, how are you?',
      unreadCount: 2,
      messages: [
        { id: 1, text: 'Hi there!', sender: 'me' },
        { id: 2, text: 'How are you doing?', sender: 'me' },
        { id: 3, text: 'Hey, I\'m good. Thanks for asking!', sender: 'other' }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      avatar: '/api/placeholder/50/50', 
      lastMessage: 'Meeting at 2 PM',
      unreadCount: 1,
      messages: [
        { id: 1, text: 'Let\'s discuss the project', sender: 'other' },
        { id: 2, text: 'Sure, what details do you want to cover?', sender: 'me' }
      ]
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectUser = (user: User | null) => {
    setSelectedUser(user);
  };

  const addMessage = (userId: number, message: Message) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              messages: [...user.messages, message],
              lastMessage: message.text,
              unreadCount: user.id !== selectedUser?.id ? user.unreadCount + 1 : user.unreadCount
            }
          : user
      )
    );
  };

  return (
    <ChatContext.Provider value={{ users, selectedUser, selectUser, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook for using Chat Context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

// Updated Chat Component
const Chat: React.FC = () => {
  const { selectedUser } = useChatContext();

  return (
    <div className="flex h-screen w-screen bg-white">
      <Sidebar />
      {selectedUser ? (
        <ChatWindow />
      ) : (
        <div className="flex-grow flex items-center justify-center bg-gray-100 text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default Chat;