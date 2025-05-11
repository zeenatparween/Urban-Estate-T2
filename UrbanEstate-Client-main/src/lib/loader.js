import { defer } from "react-router-dom";
import api from "../utils/api";
import { store } from "../store/store.js";

export async function singlePostLoader({ params }) {
    const postRes = await fetch(import.meta.env.VITE_SERVER_URL + "/posts/" + params.id, {
        method: "GET",
    });

    const post = await postRes.json();

    if (store.getState()?.auth?.status) {
        try {
            const isPostSaved = await api.get("users/savepost/" + params.id);

            if (isPostSaved.data?.data?._id) {
                post.data.savedPost = isPostSaved.data?.data?._id;
            }
        } catch (err) {
            console.log(err);
        }
    }

    return post;
}

export async function listPageLoader({ request, params }) {
    const query = request.url.split("?")[1];
    const posts = api.get("/posts?" + query);

    return defer({ packagePost: posts });
}

export async function profileLoader({ request, params }) {
    const authorPosts = api.get("/posts/author");
    const authorSavedPosts = api.get("/users/savepost");
    const newChats = api.get("/chat/");

    return defer({ authorPosts: authorPosts, authorSavedPosts: authorSavedPosts, newChats: newChats });
}
