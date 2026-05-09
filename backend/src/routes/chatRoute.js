// routes/chatRoute.js
const express = require("express");
const { createChat,sendMessage, getChatById  } = require("../Controller/ChatController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:chatId", authMiddleware, getChatById);

router.post("/", authMiddleware, createChat);
router.post("/message", authMiddleware, sendMessage);

module.exports = router;