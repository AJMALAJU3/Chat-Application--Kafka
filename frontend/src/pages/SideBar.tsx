import React from 'react';
import ChatList from './ChatList';
import Header from './Header';

const Sidebar: React.FC = () => {
  

  return (
    <div className="w-80 bg-gray-100 border-r h-screen flex flex-col">
      <Header />
      <ChatList />
    </div>
  );
};

export default Sidebar;