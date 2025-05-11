import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        select: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a email."],
        unique: true,
        validator: [validator.isEmail, "Please provide a valid email."],
    },
    avatar: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre(/^find/, function (next) {
    // this points to current query

    this.find({ active: { $ne: false } });

    next();
});

const User = mongoose.model("User", userSchema);

export default User;
