import express from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import { uploadMultiple } from "../util/uploadFile/uploadFile.js";

const router = express.Router();

router.route("/author").get(authController.verifyToken, postController.getAuthorPosts);

router
    .route("/")
    .get(postController.getAllPost)
    .post(
        authController.verifyToken,
        uploadMultiple("./public/uploads/postImages", "postImages"),
        postController.createPost
    );
router
    .route("/:id")
    .get(postController.getPost)
    .patch(authController.verifyToken, postController.updatePost)
    .delete(authController.verifyToken, postController.deletePost);

export default router;
