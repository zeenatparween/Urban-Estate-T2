import Post from "../models/postModel.js";
import PostDetails from "../models/postDetailsModel.js";
import AppError from "../util/appError.js";
import filterObject from "../util/filterObject.js";
import mongoose from "mongoose";
import SavedPost from "../models/savedPostModel.js";

class PostServices {
    async createPost(data, files, author) {
        const postData = filterObject(
            data,
            "title",
            "price",
            "images",
            "address",
            "city",
            "zip",
            "bedroom",
            "bathroom",
            "ServiceType",
            "propertyType"
        );

        if (data.latitude && data.longitude) {
            postData.location = {
                type: "Point",
                coordinates: [data.latitude, data.longitude],
            };
        }

        postData.images = files.map((file) => file.filename);

        postData.author = author;

        const postDetailsData = filterObject(
            data,
            "description",
            "utilities",
            "pet",
            "income",
            "size",
            "school",
            "bus",
            "restaurant"
        );

        if (!postData.title) {
            throw new AppError("Title is required", 400);
        }

        if (!postData.price) {
            throw new AppError("Price is required", 400);
        }

        const post = await Post.create(postData);

        if (post.id) {
            postDetailsData.postId = post.id;

            const postDetails = await PostDetails.create(postDetailsData);
        }

        return post;
    }

    async getPost(Id) {
        if (!mongoose.Types.ObjectId.isValid(Id)) {
            throw new AppError("Invalid post id.", 400);
        }

        const postData = {};

        postData.post = await Post.findById(Id).populate("author", "username email avatar");

        postData.postDetails = await PostDetails.findOne({ postId: Id });

        return postData;
    }

    async getAuthorPosts(author) {
        return await Post.find({ author: author });
    }

    async getAllPost(filter) {
        const query = {};
        if (filter.city) query.city = filter.city;
        if (filter.type) query.ServiceType = filter.type;
        if (filter.property) query.propertyType = filter.property;
        if (filter.bedroom > 0) {
            query.bedroom = {};
            query.bedroom.$gte = parseInt(filter.bedroom);
        }

        if ((filter.minPrice && filter.minPrice > 0) || (filter.maxPrice && filter.maxPrice > 0)) {
            query.price = {};
            if (filter.minPrice) query.price.$gte = parseInt(filter.minPrice);
            if (filter.maxPrice) query.price.$lte = parseInt(filter.maxPrice);
        }

        return await Post.find(query).collation({ locale: "en", strength: 2 });
    }

    async updatePost(postData) {}

    async deletePost(Id, author) {
        if (!mongoose.Types.ObjectId.isValid(Id)) {
            throw new AppError("Invalid post id.", 400);
        }

        return await Post.findOneAndUpdate({ _id: Id, author: author }, { isDeleted: true });
    }

    async savePost(userId, postId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user id");
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error("Invalid post id");
        }

        const isPostExist = await SavedPost.findOne({ userId: userId, postId: postId });

        if (isPostExist) {
            return await SavedPost.deleteOne({ userId: userId, postId: postId });
        } else {
            return await SavedPost.create({ userId: userId, postId: postId });
        }
    }

    async getSavePost(userId, postId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user id");
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error("Invalid post id");
        }

        return await SavedPost.findOne({ userId: userId, postId: postId }).select("id");
    }

    async getAllSavedPost(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user id");
        }

        const savedPosts = await SavedPost.find({ userId: userId }).select("postId");

        const postIds = savedPosts.map((savedPost) => savedPost.postId);

        const posts = await Post.find({ _id: { $in: postIds } });

        return posts;
    }
}

export default new PostServices();
