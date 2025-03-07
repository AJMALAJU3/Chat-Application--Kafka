import { IMessage, Message } from "../models/Message";

export interface IMessageRepository {
    createMessage(messageData: Partial<IMessage>): Promise<IMessage>;
    getMessagesByChatId(chatId: string, limit?: number): Promise<IMessage[]>;
    updateMessage(messageId: string, updates: Partial<IMessage>): Promise<IMessage | null>;
    deleteMessage(messageId: string): Promise<boolean>;
    markMessageAsSeen(messageId: string, userId: string): Promise<IMessage | null>;
}

export class MessageRepository implements IMessageRepository {
    async createMessage(messageData: Partial<IMessage>): Promise<IMessage> {
        const message = new Message(messageData);
        return await message.save();
    }

    async getMessagesByChatId(chatId: string, limit: number = 50): Promise<IMessage[]> {
        return await Message.find({ chatId }).sort({ timestamp: 1 }).limit(limit);
    }

    async updateMessage(messageId: string, updates: Partial<IMessage>): Promise<IMessage | null> {
        return await Message.findByIdAndUpdate(messageId, updates, { new: true });
    }

    async deleteMessage(messageId: string): Promise<boolean> {
        const result = await Message.findByIdAndDelete(messageId);
        return result !== null;
    }

    async markMessageAsSeen(messageId: string, userId: string): Promise<IMessage | null> {
        return await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { seenBy: userId } },
            { new: true }
        );
    }
}
