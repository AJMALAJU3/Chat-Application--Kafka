import mongoose, { InferSchemaType, Schema } from "mongoose";

const MessageSchema = new Schema({
    // chatId: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    senderId: { type: String, ref: 'User', required: true},
    content: { type: String, required:true, trim: true },
    messageType: { type: String, enum: ['text', 'image', 'video', 'audio', 'file'], default: 'text' },
    // mediaUrl: { type: String, default: null },
    reactions: { type: Map, of: String },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timestamp: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
});

export type IMessage = InferSchemaType<typeof MessageSchema>
export const Message = mongoose.model<IMessage>("Message", MessageSchema);
