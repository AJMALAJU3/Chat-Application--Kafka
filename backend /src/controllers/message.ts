import { Request, Response } from "express";
import { IMessageRepository } from "../repositories/Message";
import { producer } from "../utils/kafkaUtil";

export class MessageController {
    private messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
       this.messageRepository = messageRepository
    }

    async getMessage (req: Request, res: Response): Promise<void> {
        try {
            console.log('get get get asdf')

            const messages = await this.messageRepository.getMessages()
            res.json(messages);
          } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).send("Error retrieving messages");
          }
    }

    async sendMessage (req: Request, res: Response): Promise<void> {
        try {
            const { content, senderId } = req.body;
            console.log(content, senderId)
            const timestamp = new Date();
            console.log("Message sent at:", timestamp.getTime());
            await producer.send({
              topic: "chat-messages",
              messages: [{ value: JSON.stringify({ content, senderId, timestamp }) }],
            });
        
            res.send("Message sent!");
          } catch (error) {
            console.error("Kafka producer error:", error);
            res.status(500).send("Error sending message");
          }
    }
}