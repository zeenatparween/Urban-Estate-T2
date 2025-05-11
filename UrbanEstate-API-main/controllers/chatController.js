import ChatServices from "../services/chatServices.js";
import AppError from "../util/appError.js";

class ChatController {
    async getChats(req, res, next) {
        try {
            const loggedInUser = req.user.id;

            const chats = await ChatServices.getChats(loggedInUser);

            res.status(200).json({
                status: "success",
                data: chats,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async getLastUnseenChats(req, res, next) {
        try {
            const loggedInUser = req.user.id;

            const unseenChats = await ChatServices.getLastUnseenChats(loggedInUser);

            res.status(200).json({
                status: "success",
                data: unseenChats,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async getChat(req, res, next) {
        try {
            const chatId = req.params.chatId;
            const loggedInUser = req.user.id;

            const chat = await ChatServices.getChat(loggedInUser, chatId);

            res.status(200).json({
                status: "success",
                data: chat,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async markRead(req, res, next) {
        try {
            const chatId = req.params.chatId;
            const loggedInUser = req.user.id;

            const chat = await ChatServices.markRead(loggedInUser, chatId);

            res.status(200).json({
                status: "success",
                data: chat,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async sendMessage(req, res, next) {
        try {
            const loggedInUser = req.user.id;

            const sendTo = req.body?.sendTo;
            const messageStr = req.body?.message;

            if (!sendTo) {
                return next(new AppError("sendTo Id is required.", 400));
            }

            if (!messageStr) {
                return next(new AppError("message is required.", 400));
            }

            const messageData = { sendBy: loggedInUser, sendTo: sendTo, message: messageStr };

            const message = await ChatServices.sendMessage(messageData);

            res.status(200).json({
                status: "success",
                data: message,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }
}

export default new ChatController();
