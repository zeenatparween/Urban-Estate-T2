import postServices from "../services/postServices.js";
import AppError from "../util/appError.js";

class PostController {
    async createPost(req, res, next) {
        try {
            const post = await postServices.createPost(req.body, req.files, req.user.id);

            res.status(200).json({
                message: "ok",
                data: post,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
                data: err,
            });
        }
    }

    async getAllPost(req, res, next) {
        const query = req.query;
        try {
            const posts = await postServices.getAllPost(query);

            res.status(200).json({
                message: "success",
                data: posts,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
                data: err,
            });
        }
    }

    async getAuthorPosts(req, res, next) {
        try {
            const posts = await postServices.getAuthorPosts(req.user.id);

            res.status(200).json({
                message: "success",
                data: posts,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
                data: err,
            });
        }
    }

    async getPost(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                next(new AppError("Post id is required.", 400));
            }

            const post = await postServices.getPost(id);

            res.status(200).json({
                message: "success",
                data: post,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
                data: err,
            });
        }
    }

    async updatePost(req, res, next) {}

    async deletePost(req, res, next) {
        try {
            const deletedPost = await postServices.deletePost(req.params.id, req.user.id);

            if (!deletedPost) {
                return next(new AppError("Unable to delete post,", 500));
            }

            res.status(200).json({
                message: "ok",
                data: deletedPost,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
                data: err,
            });
        }
    }

    async savePost(req, res, next) {
        try {
            const loggedUserId = req.user.id;
            const postId = req.body.postId;

            if (!postId) {
                return next(new AppError("Post Id is required.", 400));
            }

            const savedPost = await postServices.savePost(loggedUserId, postId);

            res.status(200).json({
                status: "success",
                data: savedPost,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async getSavePost(req, res, next) {
        try {
            const loggedUserId = req.user.id;
            const postId = req.params.id;

            if (!postId) {
                next(new AppError("Post id is required.", 400));
            }

            const savedPost = await postServices.getSavePost(loggedUserId, postId);
            res.status(200).json({
                status: "success",
                data: savedPost,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async getAllSavedPost(req, res, next) {
        try {
            const loggedUserId = req.user.id;
            console.log(loggedUserId);
            const savedPost = await postServices.getAllSavedPost(loggedUserId);
            res.status(200).json({
                status: "success",
                data: savedPost,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }
}

export default new PostController();
