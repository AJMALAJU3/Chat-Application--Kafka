import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/utils/axiosInstance';
import { useChatContext } from '@/hooks/useChatContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const { selectedChat, addMessage } = useChatContext();
  const userId = useSelector((state: RootState) => state.user._id)

  if (!selectedChat) return null;
  console.log(selectedChat,'selected chat')

  const sendMessage = async () => {
    if (message.trim()) {
      const response = await axiosInstance.post('/message/messages',{ content: message, senderId: userId, chatId: selectedChat.chatId })
      addMessage({ content: message, senderId: userId, chatId: selectedChat.chatId });
      setMessage('');
    }
  };

  return (
    <div className="flex-grow flex flex-col h-screen">

      <div className="p-4 bg-white flex justify-between items-center border-b">
        <div className="flex items-center">
          <Avatar className="mr-4">
            {/* <AvatarImage src={selectedChat?.avatar} />
            <AvatarFallback>{selectedChat?.name?.charAt(0)}</AvatarFallback> */}
          </Avatar>
          <div>
            {/* <h2 className="font-semibold">{selectedChat?.name}</h2> */}
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
        {selectedChat.messages.map(msg => (

          <div 
            key={msg._id} 
            className={`flex mb-4 ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-md ${
                msg.senderId === userId 
                  ? 'bg-green-100 text-right' 
                  : 'bg-white text-left'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white flex items-center space-x-4">
        <button><Smile className="text-gray-600" /></button>
        <button><Paperclip className="text-gray-600" /></button>
        <Input 
          placeholder="Type a message" 
          className="flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button 
          variant="ghost" 
          className="text-green-600"
          onClick={sendMessage}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;