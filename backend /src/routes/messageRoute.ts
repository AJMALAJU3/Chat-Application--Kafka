import { Router } from "express";
import { MessageController } from "../controllers/message";
import { MessageRepository } from "../repositories/Message";

const router = Router()

const messageRepository = new MessageRepository()
const messageController = new MessageController(messageRepository)


router.post('/send', messageController.sendMessage)
router.get('/messages', messageController.getMessage)

export default router;