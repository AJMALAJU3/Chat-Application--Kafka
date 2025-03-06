import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useChatContext } from './Chat';
import axios from 'axios'
import { axiosInstance } from '@/utils/axiosInstance';

const ChatWindow: React.FC = () => {
  // const [message, setMessage] = useState('');
  // const { selectedUser, addMessage } = useChatContext();

  // if (!selectedUser) return null;

  // const sendMessage = async () => {
  //   if (message.trim()) {
  //     const newMessage = {
  //       text: message,
  //       sender: 'me' as const,
  //     };
  //     const response = await axiosInstance.post('/send',{ content: newMessage.text, senderId: '234123412341234' })
  //     console.log(response)
  //     addMessage(selectedUser.id, newMessage);
  //     setMessage('');
  //   }
  // };

  return (
    <div className="flex-grow flex flex-col h-screen">
{/* 
      <div className="p-4 bg-white flex justify-between items-center border-b">
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage src={selectedUser.avatar} />
            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedUser.name}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
        {selectedUser.messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-md ${
                msg.sender === 'me' 
                  ? 'bg-green-100 text-right' 
                  : 'bg-white text-left'
              }`}
            >
              {msg.text}
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
      </div> */}
    </div>
  );
};

export default ChatWindow;