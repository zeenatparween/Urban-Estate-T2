import { useEffect, useRef, useState } from "react";
import "./chat.scss";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import { getFormattedDate } from "../../utils/dateTimeFormat.js";
import { io } from "socket.io-client";

const socket = io("ws://localhost:8800");

function Chat({ chats }) {
    const [chatOn, setChatOn] = useState(false);
    const [chat, setChat] = useState([]);
    const [messageUser, setMessageUser] = useState({});
    const userData = useSelector((state) => state.auth.userData);
    const bottomRef = useRef(null);

    const openChat = async (chatId, mUser) => {
        setChat([]);
        try {
            const { data: messages } = await api.get("/chat/" + chatId);

            setChat(messages?.data);
            setMessageUser(mUser);
            setChatOn(true);

            await api.post("/chat/" + chatId);
        } catch (err) {
            setChatOn(false);
            console.log(err);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const message = formData.get("message");
        if (!message) {
            return;
        }

        try {
            const { data: res } = await api.post("/chat/", { sendTo: messageUser._id, message: message });

            setChat((prevChat) => [...prevChat, res?.data]);
            e.target.reset();
            socket.emit("sendMessage", res?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat]);

    useEffect(() => {
        if (userData.id) {
            socket.emit("register", userData.id);
        }

        socket.on("getMessage", (msg) => {
            console.log(messageUser._id);
            if (chatOn && msg.sendById === messageUser._id) {
                setChat((prevChat) => [...prevChat, msg]);
            }
        });
    }, [chatOn, userData.id, messageUser]);

    return (
        <div className="chat">
            <div className="messages">
                <p>Messages</p>
                {chats?.map((chat) => (
                    <div
                        key={chat._id}
                        className="message"
                        style={{ backgroundColor: chat.lastMessage.seen ? "white" : "#fece514e" }}
                        onClick={() => openChat(chat.lastMessage.chatId, chat.messageUser)}
                    >
                        <img src={import.meta.env.VITE_AVATAR_URL + chat?.messageUser?.avatar} alt="" />
                        <span>{chat.messageUser?.username}</span>
                        <p>{chat.lastMessage.message}</p>
                    </div>
                ))}
            </div>
            {chatOn && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={import.meta.env.VITE_AVATAR_URL + messageUser.avatar} alt="" />
                            {messageUser.username}
                        </div>
                        <span className="close" onClick={() => setChatOn(false)}>
                            X
                        </span>
                    </div>
                    <div className="center">
                        {chat.map((message) => (
                            <div
                                key={message._id}
                                className={`chatMessage ${message.sendById === userData.id ? "own" : ""}`}
                            >
                                <p>{message.message}</p>
                                <span>
                                    <p title={new Date(message.createdAt).toLocaleString()}>
                                        {getFormattedDate(message.createdAt)}
                                    </p>
                                </span>
                            </div>
                        ))}
                        <div ref={bottomRef}></div>
                    </div>
                    <form className="bottom" onSubmit={handleSendMessage}>
                        <textarea name="message" id="message"></textarea>
                        <button>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;
