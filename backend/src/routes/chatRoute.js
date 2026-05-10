// routes/chatRoute.js
const express = require("express");
const { createChat,sendMessage, getChatById, getMyChats  } = require("../Controller/ChatController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:chatPublicId", authMiddleware, getChatById);
router.get("/", authMiddleware, getMyChats);

router.post("/", authMiddleware, createChat);
router.post("/message", authMiddleware, sendMessage);

module.exports = router;