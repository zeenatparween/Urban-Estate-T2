import express from "express";
import authController from "../controllers/authController.js";
import ChatController from "../controllers/chatController.js";

const router = express.Router();

router
    .route("/")
    .get(authController.verifyToken, ChatController.getLastUnseenChats)
    .post(authController.verifyToken, ChatController.sendMessage);
router
    .route("/:chatId")
    .get(authController.verifyToken, ChatController.getChat)
    .post(authController.verifyToken, ChatController.markRead);

export default router;
