import express from "express";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import { uploadSingle } from "../util/uploadFile/uploadFile.js";

const router = express.Router();

router
    .get("/savepost", authController.verifyToken, postController.getAllSavedPost)
    .post("/savepost", authController.verifyToken, postController.savePost)
    .get("/savepost/:id", authController.verifyToken, postController.getSavePost);

router
    .get("/", authController.verifyToken, userController.getAllUser)
    .get("/:id", authController.verifyToken, userController.getUser)
    .patch(
        "/:id",
        authController.verifyToken,
        uploadSingle("./public/uploads/avatar", "avatar"),
        userController.updateUser
    )
    .delete("/:id", authController.verifyToken, userController.deleteUser);

export default router;
