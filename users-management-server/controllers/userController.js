const User = require("../models/User");
const jwt = require('jsonwebtoken');

// get all users 
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ lastLogin: -1 }); // Ensure field name consistency
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// get single user 
exports.getUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Block multiple users
exports.blockUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        await User.updateMany({ _id: { $in: userIds } }, { isBlocked: true });
        res.json({ message: "Users blocked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error blocking users", error: error.message });
    }
};

// Unblock multiple users
exports.unblockUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        await User.updateMany({ _id: { $in: userIds } }, { isBlocked: false });
        res.json({ message: "Users unblocked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error unblocking users", error: error.message });
    }
};

// Delete multiple users
exports.deleteUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        await User.deleteMany({ _id: { $in: userIds } });
        res.json({ message: "Users deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting users", error: error.message });
    }
};