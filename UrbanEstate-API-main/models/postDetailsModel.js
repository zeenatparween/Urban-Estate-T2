import mongoose from "mongoose";

const postDetailsSchema = new mongoose.Schema({
    description: String,
    utilities: String,
    pet: String,
    income: String,
    size: Number,
    school: Number,
    bus: Number,
    restaurant: Number,
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
    },
});

const PostDetails = mongoose.model("PostDetails", postDetailsSchema);

export default PostDetails;
