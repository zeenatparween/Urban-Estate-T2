import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
    },
    sendById: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    sendToId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    seen: {
        type: Boolean,
        default: false,
    },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
