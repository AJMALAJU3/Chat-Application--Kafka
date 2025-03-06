import { IChat, Chat } from "../models/Chat";
import mongoose from "mongoose";

export class ChatRepository implements IChatRepository {
    
    async createChat(participants: mongoose.Types.ObjectId[], isGroup = false, groupName: string | null = null, groupIcon: string | null = null): Promise<IChat> {
        const newChat = new Chat({ participants, isGroup, groupName, groupIcon });   
        return await newChat.save();
    }

    async getChatById(chatId: mongoose.Types.ObjectId): Promise<IChat | null> {
        return await Chat.findById(chatId).populate("participants").populate("lastMessage");
    }

    async getUserChats(userId: mongoose.Types.ObjectId): Promise<IChat[]> {
        console.log(userId)
        const result =  await Chat.find({ participants: userId }).populate({path:"participants", select:"email"})
        console.log(result[0].participants)
        return result
    }

    async updateLastMessage(chatId: mongoose.Types.ObjectId, messageId: mongoose.Types.ObjectId): Promise<IChat | null> {
        return await Chat.findByIdAndUpdate(chatId, { lastMessage: messageId }, { new: true });
    }

    async deleteChat(chatId: mongoose.Types.ObjectId): Promise<void> {
        await Chat.findByIdAndDelete(chatId);
    }
}


export interface IChatRepository {
    createChat(participants: mongoose.Types.ObjectId[], isGroup?: boolean, groupName?: string | null, groupIcon?: string | null): Promise<IChat>;
    getChatById(chatId: mongoose.Types.ObjectId): Promise<IChat | null>;
    getUserChats(userId: mongoose.Types.ObjectId): Promise<IChat[]>;
    updateLastMessage(chatId: mongoose.Types.ObjectId, messageId: mongoose.Types.ObjectId): Promise<IChat | null>;
    deleteChat(chatId: mongoose.Types.ObjectId): Promise<void>;
}
