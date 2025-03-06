import mongoose, { InferSchemaType, Schema } from "mongoose";

const ChatSchema = new Schema({
    isGroup: { type: Boolean, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    groupName: { type: String, default: null },
    groupIcon: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
});

export type IChat = InferSchemaType<typeof ChatSchema>  & { _id: mongoose.Types.ObjectId };
export const Chat = mongoose.model<IChat>("Chat", ChatSchema);


