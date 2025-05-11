import userServices from "../services/userServices.js";
import AppError from "../util/appError.js";

class UserController {
    async getAllUser(req, res) {
        try {
            const users = await userServices.getAllUsers();

            res.status(200).json({
                message: "success",
                data: users,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: "Failed to get users.",
            });
        }
    }

    async getUser(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                return next(new AppError("Please provide id.", 400));
            }

            const user = await userServices.getUser(id);

            if (!user) {
                return next(new AppError("User does not exist.", 404));
            }

            res.status(200).json({
                message: "success",
                data: user,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async updateUser(req, res, next) {
        try {
            const loggedUserId = req.user.id;
            const requestedId = req.params.id;

            if (loggedUserId !== requestedId) {
                return next(new AppError("You are not authorize to perform this operation.", 403));
            }

            const updatedUser = await userServices.updateUser(requestedId, req.body, req.file);

            const userInfo = {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                avatar: updatedUser.avatar ? `http://localhost:8800/public/uploads/avatar/${updatedUser.avatar}` : "",
            };

            res.status(200).json({
                status: "success",
                data: userInfo,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }

    async deleteUser(req, res, next) {
        try {
            const loggedUserId = req.user.id;
            const requestedId = req.params.id;

            if (loggedUserId !== requestedId) {
                return next(new AppError("You are not authorize to perform this operation.", 403));
            }

            const deletedUser = await userServices.deleteUser(requestedId);

            res.status(200).json({
                status: "success",
                data: null,
            });
        } catch (err) {
            res.status(err?.statusCode || 500).json({
                message: err.message,
            });
        }
    }
}

export default new UserController();
