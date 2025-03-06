import mongoose, { InferSchemaType, Schema } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required:true}
});

export type IUser = InferSchemaType<typeof UserSchema>  & { _id: mongoose.Types.ObjectId };
export const User = mongoose.model<IUser>("User", UserSchema);
