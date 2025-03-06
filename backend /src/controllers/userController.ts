import { Request, Response } from "express";
import { IUserRepository } from "../repositories/userRepository";

export class UserController {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
       this.userRepository = userRepository

       this.createUser = this.createUser.bind(this)
       this.loginUser = this.loginUser.bind(this)
    }

    async createUser (req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(email, password)
            const result = await this.userRepository.createUser({ email, password })
            res.json({message:"user created successfully", userId: result._id});
          } catch (error) {
            console.log(error)
            res.status(500).send("Error creating user");
          }
    }

    async loginUser (req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(email, password)
            const result = await this.userRepository.getUser(email)

            result ? res.json({message:"user logined successfully", userId: result._id})
            : res.json({message:"user not found"})

          } catch (error) {
            console.log(error)
            res.status(500).send("Error creating user");
          }
    }
}