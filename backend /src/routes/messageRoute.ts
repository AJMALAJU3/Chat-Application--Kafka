import { Router } from "express";
import { MessageController } from "../controllers/message";
import { MessageRepository } from "../repositories/Message";

const router = Router();

const messageRepository = new MessageRepository();
const messageController = new MessageController(messageRepository);

router.post("/messages", (req, res) => messageController.createMessage(req, res));
router.get("/messages/:chatId", (req, res) => messageController.getMessagesByChatId(req, res));
router.put("/messages/:messageId", (req, res) => messageController.updateMessage(req, res));
router.delete("/messages/:messageId", (req, res) => messageController.deleteMessage(req, res));
router.patch("/messages/:messageId/seen", (req, res) => messageController.markMessageAsSeen(req, res));

export default router;
