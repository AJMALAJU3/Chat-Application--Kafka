import { RootState } from "@/store/store";
import { axiosInstance } from "@/utils/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const fetchUserChats = async (userId: string) => {
    console.log(userId)
    const response = await axiosInstance.get(`/chat/user/${userId}`);
    console.log(response)
    if (!response) {
        throw new Error("Failed to fetch chats");
    }
    return response.data;
};

const ChatList = () => {
    const userId = useSelector((state: RootState) => state.user?._id);

    const { data: chats, isLoading, error } = useQuery({
        queryKey: ["userChats", userId],
        queryFn: () => fetchUserChats(userId!),
        enabled: !!userId,
    });

    if (!userId) return <p>Please log in to see your chats.</p>;
    if (isLoading) return <p>Loading chats...</p>;
    if (error) return <p>Error loading chats: {error.message}</p>;

    return (
        <div className="flex-grow overflow-y-auto">
            <h2>Your Chats</h2>
            {chats.length === 0 ? (
                <p>No chats available</p>
            ) : (
                <ul>
                    {chats.map((chat: any) => (
                        <div
                            key={chat._id}
                            className={`p-4 flex items-center hover:bg-gray-200 cursor-pointer `}
                        // onClick={() => selectUser(user)}
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
    );
};

export default ChatList;
