import mongoose from "mongoose";
import { IMessage, Message } from "../models/Message";

export class MessageRepository {

    async getMessages (): Promise<IMessage[]> {
        const messages = await Message.find().sort({ timestamp: 1 });
        return messages
    }

    async postMessages ({ senderId, content }: { senderId: mongoose.Schema.Types.ObjectId; content: string}): Promise<IMessage> {
        console.log('post message', senderId ,content)
        const newMessage = new Message({ senderId, content });
        return await newMessage.save();
    }

}


export interface IMessageRepository {
    getMessages(): Promise<IMessage[]>
    postMessages ({ senderId, content }: { senderId: mongoose.Schema.Types.ObjectId; content: string}): Promise<IMessage>
}