const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res
                .status(409)
                .json({ success: false, message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });

        if (newUser) {
            return res.status(201).json({
                success: true,
                message: "Registered User Successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("refreshToken");

        return res
            .status(200)
            .json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const refreshToken = (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res
                .status(401)
                .json({ success: false, message: "No Refresh Token" });
        }

        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newToken = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        return res
            .status(200)
            .json({ success: true, message: "Token Refreshed Successfully" });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};

const getLoggedInUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid Credentials" });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "Current User",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    getLoggedInUser,
};
