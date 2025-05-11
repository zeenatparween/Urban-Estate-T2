import User from "../models/userModel.js";
import mongoose from "mongoose";
import filterObject from "../util/filterObject.js";

class UserServices {
    async getAllUsers(filter) {
        return await User.find();
    }

    async getUser(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user id");
        }

        return await User.findById(id);
    }

    async updateUser(id, update, avatar) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user id");
        }

        const filteredFields = filterObject(update, "username", "email");

        if (avatar && avatar.filename) {
            filteredFields.avatar = avatar.filename;
        }

        return User.findByIdAndUpdate(id, filteredFields, { new: true });
    }

    async deleteUser(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user id");
        }

        return User.findByIdAndUpdate(id, { active: false });
    }
}

const userServices = new UserServices();

export default userServices;
