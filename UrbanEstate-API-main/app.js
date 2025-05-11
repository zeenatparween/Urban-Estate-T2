import express from "express";
import http from "http";
import { Server } from "socket.io";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import GlobalError from "./controllers/errorController.js";
import path from "path";
import { setSocketUser, getSocketUser, removeSocketUser } from "./util/socketUsers.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://urban-estate-client.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

dotenv.config({ path: ".env" });

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// app.use("/public", express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database.");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB ", err);
    });

app.get("/", (req, res, next) => {
    res.send("hello from server " + process.env.CLIENT_URL);
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(GlobalError.globalErrorHandler);

// Socket connection
io.on("connection", (socket) => {
    socket.on("register", (userId) => {
        setSocketUser(userId, socket.id);
    });

    socket.on("sendMessage", (data) => {
        const receiver = getSocketUser(data?.sendToId);

        if (receiver) {
            io.to(receiver).emit("getMessage", data);
        }
    });

    socket.on("disconnect", () => {
        removeSocketUser(socket.id);
    });
});

server.listen(8800, () => {
    console.log("Server listing at 8800....");
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! 💥 Shutting down....");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
