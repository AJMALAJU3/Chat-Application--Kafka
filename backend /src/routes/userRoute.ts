import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserController } from "../controllers/userController";

const router = Router()

const userRepository = new UserRepository()
const userController = new UserController(userRepository)

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

export default router;