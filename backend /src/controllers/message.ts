import { Request, Response } from "express";
import { IMessageRepository } from "../repositories/Message";
import { producer } from "../utils/kafkaUtil";

export class MessageController {
    private messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
        this.messageRepository = messageRepository;
    }

    async createMessage(req: Request, res: Response): Promise<void> {
        try {
            // const message = await this.messageRepository.createMessage(req.body);
            await producer.send({ topic: "chat-messages", messages: [{ value: JSON.stringify(req.body) }] });
            res.send("Message sent!");
            // res.status(201).json(message);
//       const { content, senderId } = req.body;
//       console.log(content, senderId)
//       const timestamp = new Date();
//       console.log("Message sent at:", timestamp.getTime());
//       await producer.send({
//         topic: "chat-messages",
//         messages: [{ value: JSON.stringify({ content, senderId, timestamp }) }],
//       });
  
//       res.send("Message sent!");
        } catch (error) {
            res.status(500).json({ error: "Failed to create message" });
        }
    }

    async getMessagesByChatId(req: Request, res: Response): Promise<void> {
        try {
            const { chatId } = req.params;
            const messages = await this.messageRepository.getMessagesByChatId(chatId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve messages" });
        }
    }

    async updateMessage(req: Request, res: Response): Promise<void> {
        try {
            const { messageId } = req.params;
            const updatedMessage = await this.messageRepository.updateMessage(messageId, req.body);
            if (!updatedMessage) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        } catch (error) {
            res.status(500).json({ error: "Failed to update message" });
        }
    }

    async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const { messageId } = req.params;
            const deleted = await this.messageRepository.deleteMessage(messageId);
            if (!deleted) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete message" });
        }
    }

    async markMessageAsSeen(req: Request, res: Response): Promise<void> {
        try {
            const { messageId } = req.params;
            const { userId } = req.body;
            const updatedMessage = await this.messageRepository.markMessageAsSeen(messageId, userId);
            if (!updatedMessage) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        } catch (error) {
            res.status(500).json({ error: "Failed to mark message as seen" });
        }
    }
}




// async sendMessage (req: Request, res: Response): Promise<void> {
//   try {
//       const { content, senderId } = req.body;
//       console.log(content, senderId)
//       const timestamp = new Date();
//       console.log("Message sent at:", timestamp.getTime());
//       await producer.send({
//         topic: "chat-messages",
//         messages: [{ value: JSON.stringify({ content, senderId, timestamp }) }],
//       });
  
//       res.send("Message sent!");
//     } catch (error) {
//       console.error("Kafka producer error:", error);
//       res.status(500).send("Error sending message");
//     }
// }