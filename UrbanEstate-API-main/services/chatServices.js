import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import AppError from "../util/appError.js";
import mongoose from "mongoose";

class ChatServices {
    async getChat(loggedUserId, chatId) {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new AppError("Invalid chat id.", 400);
        }

        if (!(await Chat.exists({ chatBetween: { $in: [new mongoose.Types.ObjectId(`${loggedUserId}`)] } }))) {
            throw new AppError("You are not allowed to get this chat.", 401);
        }

        return await Message.find({ chatId: chatId })
            .select("message createdAt seen sendById sendToId")
            .sort({ createdAt: 1 });
    }

    async markRead(loggedUserId, chatId) {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new AppError("Invalid chat id.", 400);
        }

        return await Message.updateMany({ chatId: chatId, sendToId: loggedUserId }, { seen: true });
    }

    async getLastUnseenChats(loggedInUser) {
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            throw new AppError("Invalid send to id.", 400);
        }

        return await Chat.aggregate([
            {
                $match: {
                    chatBetween: { $in: [new mongoose.Types.ObjectId(`${loggedInUser}`)] },
                },
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "lastMessageId",
                    foreignField: "_id",
                    as: "lastMessage",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "chatBetween",
                    foreignField: "_id",
                    as: "messageUser",
                },
            },
            {
                $unwind: "$lastMessage",
            },
            {
                $unwind: "$messageUser",
            },
            // {
            //     $match: {
            //         "lastMessage.seen": false,
            //     },
            // },
            {
                $match: {
                    "messageUser._id": { $ne: new mongoose.Types.ObjectId(`${loggedInUser}`) },
                },
            },
            {
                $project: {
                    sendById: 1,
                    sendToId: 1,
                    "lastMessage.message": 1,
                    "lastMessage.createdAt": 1,
                    "lastMessage.chatId": 1,
                    "lastMessage.seen": 1,
                    "messageUser.username": 1,
                    "messageUser.avatar": 1,
                    "messageUser._id": 1,
                },
            },
            { $sort: { "lastMessage.createdAt": -1 } },
        ]);
    }

    async sendMessage(data) {
        let chatId;

        const chat = await Chat.findOneAndUpdate(
            {
                $or: [
                    { chatBetween: { $all: [data.sendBy, data.sendTo] } }, // Match existing chat
                    { chatBetween: { $all: [data.sendTo, data.sendBy] } }, // Handle reverse order
                ],
            },
            {
                $setOnInsert: {
                    chatBetween: [data.sendBy, data.sendTo],
                },
            },
            { upsert: true, new: true }
        );

        if (!chat) {
            throw new Error("Unable to create chat.");
        }

        chatId = chat._id;

        const message = await Message.create({
            chatId: chatId,
            sendById: data.sendBy,
            sendToId: data.sendTo,
            message: data.message,
            createdAt: Date.now(),
        });

        if (!message) {
            throw new Error("Unable to send message.");
        }

        await Chat.findOneAndUpdate({ _id: chatId }, { lastMessageId: message._id, lastMessageDate: Date.now() });

        return message;
    }
}

export default new ChatServices();
