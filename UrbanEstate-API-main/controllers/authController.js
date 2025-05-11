import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Create a new user and save to DB
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User ceated successfully",
            data: newUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username or password is required",
        });
    }

    try {
        // Find and check if user exist
        const user = await User.findOne({ username: username }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials!",
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials!",
            });
        }

        // Generate cookie token and send to user

        const cookieOption = {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        };

        if (process.env.NODE_ENV === "production") {
            cookieOption.secure = true;
            cookieOption.sameSite = "None";
        }

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: true,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 1000 * 60 * 60 * 24 * 7,
                // expiresIn: 60,
            }
        );

        const userInfo = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        };

        res.cookie("token", token, cookieOption).status(200).json({
            message: "Login successful",
            data: userInfo,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout successful.",
    });
};

const verifyToken = async (req, res, next) => {
    try {
        let token;

        if (!req.cookies.token) {
            return res.status(401).json({
                message: "You are not logged in! Please log in to get access.",
            });
        }

        token = req.cookies.token;

        const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const userStillExist = await User.findById(decodedToken.id);

        if (!userStillExist) {
            return res.status(401).json({
                message: "The user belonging to this token does no longer exist.",
            });
        }

        req.user = userStillExist;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
};

const restrictTo = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            message: "You do not have permission to perform this action.",
        });
    }

    next();
};

const me = async (req, res) => {
    const userInfo = {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
    };

    return res.status(200).json({
        message: "You are logged in.",
        data: userInfo,
    });
};

const authController = {
    register: register,
    login: login,
    logout: logout,
    verifyToken: verifyToken,
    restrictTo: restrictTo,
    me: me,
};

export default authController;
