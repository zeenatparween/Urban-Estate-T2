import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/chat";
import List from "../../components/list/list";
import "./profilePage.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import api from "../../utils/api";
import { Suspense, useEffect, useState } from "react";

function ProfilePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const profileData = useLoaderData();

    const handleLogout = async () => {
        try {
            const { data: res } = await api.post("/auth/logout");

            if (!res || !res.message) {
                throw new Error("Something went wrong!, unable to logout.");
            }

            dispatch(logout());

            navigate("/");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <p>User Information</p>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img
                                src={
                                    userData.avatar
                                        ? import.meta.env.VITE_AVATAR_URL + userData?.avatar
                                        : "/userIcon.png"
                                }
                                alt=""
                            />
                        </span>
                        <span>
                            Username: <strong>{userData?.username}</strong>
                        </span>
                        <span>
                            E-mail: <strong>{userData?.email}</strong>
                        </span>
                        {isLoggedIn && (
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        )}
                    </div>
                    <div className="title">
                        <p>My List</p>
                        <Link to="/post/add">
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading posts....</p>}>
                        <Await resolve={profileData.authorPosts} errorElement={<p>Error loading posts!</p>}>
                            {(authorPosts) => <List listData={authorPosts.data?.data} />}
                        </Await>
                    </Suspense>
                    <div className="title">
                        <p>Saved List</p>
                    </div>
                    <Suspense fallback={<p>Loading saved posts....</p>}>
                        <Await resolve={profileData.authorSavedPosts} errorElement={<p>Error loading saved posts!</p>}>
                            {(authorSavedPosts) => <List listData={authorSavedPosts.data?.data} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Suspense fallback={<p>Loading new chats posts....</p>}>
                        <Await resolve={profileData.newChats} errorElement={<p>Error loading new chats posts!</p>}>
                            {(newChats) => <Chat chats={newChats.data?.data || []} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
