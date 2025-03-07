import { Kafka } from "kafkajs";
import { MessageRepository } from "../repositories/Message";
import { getSocketInstance } from "./socket";

const kafka = new Kafka({ clientId: "chat-app", brokers: ["localhost:9092"] });
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chat-group" });
const messageRepository = new MessageRepository()
export const initKafka = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected successfully.");
  } catch (error) {
    console.error("Kafka Producer connection failed:", error);
  }
};

export const runConsumer = async (attempt = 1) => {
  try {
    console.log("Connecting to Kafka consumer...");
    await consumer.connect();
    await consumer.subscribe({ topic: "chat-messages", fromBeginning: true });
    
    await consumer.run({
      eachMessage: async ({ message }:any) => {
        const io = getSocketInstance()
        const msg = JSON.parse(message.value.toString());
        messageRepository.createMessage(msg)
        io.to(msg.chatId).emit("newMessage", msg);
      },
    });

    console.log("Kafka consumer connected successfully.");
  } catch (error) {
    console.error("Kafka consumer connection failed:", error);
    if (attempt <= 5) {
      console.log(`Retrying Kafka consumer in ${attempt * 2} seconds...`);
      await consumer.disconnect(); 
      setTimeout(() => runConsumer(attempt + 1), attempt * 2000);
    } else {
      console.error("Kafka consumer failed after multiple attempts.");
    }
  }
};
runConsumer();

    