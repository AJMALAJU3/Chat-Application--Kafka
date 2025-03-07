import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/hooks/useChatContext";

const ChatList = () => {
    const userId = useSelector((state: RootState) => state.user?._id);
      const { chats, selectedChat, selectChat } = useChatContext();

    //   const filteredChats = chats.filter(chat => 
    //     chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    //   );


    return (
        <>
        <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            placeholder="Search chats" 
            className="pl-10"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
        <div className="flex-grow overflow-y-auto">
            <h2>Your Chats</h2>
            {chats.length === 0 ? (
                <p>No chats available</p>
            ) : (
                <ul>
                    {chats.map((chat: any) => (
                        <div
                        key={chat._id}
                        className={`p-4 flex items-center hover:bg-gray-200 cursor-pointer ${selectedChat?.chatId === chat._id ? 'bg-gray-200' : ''}`}
                        onClick={() => selectChat(chat._id)}
                        >
                            <Avatar className="mr-4">
                                <AvatarImage src={chat?.avatar} />
                                <AvatarFallback>{chat?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-grow">
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        {chat.isGroup
                                            ? chat.groupName
                                            : `person-${chat.participants.find((p: any) => String(p._id) === String(userId))?.email}`}

                                    </span>
                                    <span className="text-xs text-gray-500">12:30 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-600 truncate">{chat?.lastMessage}</p>
                                    {chat?.unreadCount > 0 && (
                                        <span className="bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                                            {chat?.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
            </>
    );
};

export default ChatList;
