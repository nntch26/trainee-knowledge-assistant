// routes/chatRoute.js
const express = require("express");
const { createChat,sendMessage, getChatById, getMyChats  } = require("../Controller/ChatController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { chatLimiter, apiLimiter } = require("../middlewares/apiLimiter");

const router = express.Router();

router.use(apiLimiter); // ใช้กับทุก route 

router.get("/:chatPublicId", authMiddleware, getChatById);
router.get("/", authMiddleware, getMyChats);

router.post("/", authMiddleware, createChat);
router.post("/:chatPublicId/message", authMiddleware, chatLimiter, sendMessage);

module.exports = router;