import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    price: Number,
    images: [
        {
            type: String,
        },
    ],
    address: String,
    city: String,
    zip: String,
    bedroom: Number,
    bathroom: Number,
    location: {
        type: {
            type: String,
            default: "Point",
            enum: ["Point"],
        },
        coordinates: [Number],
    },
    ServiceType: {
        type: String,
        enum: {
            values: ["buy", "rent"],
        },
    },
    propertyType: {
        type: String,
        enum: ["apartment", "house", "condo", "land"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    modifiedAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    },
});

// postSchema.pre(/^find/, function (next) {
//     this.find({ isDeleted: { $ne: true } });

//     next();
// });

const Post = mongoose.model("Post", postSchema);

export default Post;
