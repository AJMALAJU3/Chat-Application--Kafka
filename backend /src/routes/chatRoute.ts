import { Router } from "express";
import { ChatRepository } from "../repositories/chatRepository";
import { ChatController } from "../controllers/chatController";

const router = Router();

const chatRepository = new ChatRepository();
const chatController = new ChatController(chatRepository);

router.post("/", chatController.createChat);
router.get("/:chatId", chatController.getChatById);
router.get("/user/:userId", chatController.getUserChats);
router.put("/update-last-message", chatController.updateLastMessage);
router.delete("/:chatId", chatController.deleteChat);

export default router;
