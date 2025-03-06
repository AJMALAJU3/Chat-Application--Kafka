import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useChatContext } from './Chat';
import AddContact from './AddContact';
import ChatList from './ChatList';

const Sidebar: React.FC = () => {
  const { users, selectedUser, selectUser } = useChatContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const [chats, setChats] = useState()
  

  return (
    <div className="w-80 bg-gray-100 border-r h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white flex justify-between items-center">
        <Avatar>
          <AvatarImage src="/api/placeholder/50/50" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-200"
            >
                <MoreVertical className="text-gray-600" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-20">
                    <ul className="py-2">
                        <li>
                        <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setIsOpen(false);
                                    setShowAddContact(true);
                                }}
                            >
                                Add Contact
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            {showAddContact && <AddContact onClose={() => setShowAddContact(false)} />}
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input 
            placeholder="Search chats" 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ChatList />

      {/* User List */}
      {/* <div className="flex-grow overflow-y-auto">
        {filteredUsers.map(user => (
          <div 
            key={user.id} 
            className={`p-4 flex items-center hover:bg-gray-200 cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-200' : ''}`}
            onClick={() => selectUser(user)}
          >
            <Avatar className="mr-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex justify-between">
                <span className="font-semibold">{user.name}</span>
                <span className="text-xs text-gray-500">12:30 PM</span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                {user.unreadCount > 0 && (
                  <span className="bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {user.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Sidebar;