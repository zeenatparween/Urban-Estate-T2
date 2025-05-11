import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatBetween: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    lastMessageId: {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
    },
    lastMessageDate: {
        type: Date,
        default: Date.now(),
    },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
