const express = require("express");
const { getUsers, blockUser, deleteUser, unblockUser, getUser, blockUsers, unblockUsers, deleteUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getUser);
router.get("/", authMiddleware, getUsers);
router.put("/block", authMiddleware, blockUsers);
router.put("/unblock", authMiddleware, unblockUsers);
router.delete("/", authMiddleware, deleteUsers);

module.exports = router;
