import React from 'react';
import Sidebar from './SideBar';
import ChatWindow from './ChatWindow';
import { useChatContext } from '@/hooks/useChatContext';


const Chat: React.FC = () => {
  const { selectedChat } = useChatContext();

  return (
    <div className="flex h-screen w-screen bg-white">
      <Sidebar />
      {selectedChat ? (
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