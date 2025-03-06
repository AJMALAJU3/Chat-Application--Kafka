import { IUser, User } from "../models/User";

export class UserRepository implements IUserRepository {

    async getUser (email:string): Promise<IUser | null> {
        const user = await User.findOne({email});
        return user
    }

    async createUser ({ email, password }: { email:string; password: string}): Promise<IUser> {
        const newUser = new User({ email, password });
        return await newUser.save();
    }

}


export interface IUserRepository {
    getUser(email: string): Promise<IUser | null>
    createUser ({ email, password }: { email:string; password: string}): Promise<IUser> 
}