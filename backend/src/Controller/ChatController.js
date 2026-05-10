const prisma  = require("../lib/prisma");
const { generateResponse } = require("../services/chatService");


// get chat by id ประววัติแชท
const getChatById = async (req, res) => {
    try {
        const { chatPublicId } = req.params;
        const userId = req.user.id;

        // ค้นหาแชท chatid
        const chat = await prisma.chat.findUnique({
            where: {
                publicId: chatPublicId,
            },
        });

        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        // ดึงข้อความทั้งหมดของแชทนี้
        const chatMessages = await prisma.chatmessage.findMany({
            where: {
                chatId: chat.id,
                userId: userId
            }
        });

        
        return res.status(200).json({
            success: true,
            message: "Chat found successfully",
            data: {
                chatPublicId: chat.publicId,
                messages: chatMessages
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Cannot find chat" });
    }
};


// รายการแชททั้งหมดของผู้ใช้
const getMyChats = async (req, res) => {
    try {
        const userId = req.user.id;

        const chats = await prisma.chat.findMany({
            where: {
                userId: userId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Chats found successfully",
            data: chats
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Cannot find chats" });
    }
};


// create chat 
const createChat = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // สร้างแชทใหม่
        const chat = await prisma.chat.create({
            data: {userId}, 
        });


        return res.status(201).json({
            success: true,
            message: "Chat created successfully",
            data:{
                // chatId: chat.id,
                chatPublicId: chat.publicId,
                title : chat.title
            }
        });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Cannot create chat" });
  }
}


// send message to chat
const sendMessage = async (req, res) => {
  try {
    const { messages, chatPublicId } = req.body;
    const userId = req.user.id;

    if (!userId || !chatPublicId) {
      return res.status(400).json({ error: 'Missing userId or chatPublicId' });
    }
    
    // เรียก Service
    const result = await generateResponse(userId, chatPublicId, messages);

    return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        data: {
            chatPublicId: result.chatPublicId,
            message: result.assistantMessage,
        },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "chat failed" });
  }
};




module.exports = {
    createChat,
    sendMessage,
    getChatById,
    getMyChats
}