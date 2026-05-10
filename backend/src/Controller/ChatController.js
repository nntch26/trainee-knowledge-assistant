const prisma  = require("../lib/prisma");
const { generateResponse } = require("../services/chatService");


// get chat by id ประววัติแชท
const getChatById = async (req, res) => {
    try {
        const { chatPublicId } = req.params;
        const userId = req.user.id;

        // หา chat ของ user คนนี้ พร้อมดึง messages
        const chat = await prisma.chat.findFirst({
        where: {
            publicId: chatPublicId,
            userId: userId,
        },
        include: {
            messages: {
            orderBy: {
                createdAt: "asc",
            },
            },
        },
        });


        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        // ดึง token ทั้งหมดที่ user คนนี้ได้ใช้ไป
        const tokenUsages = await prisma.tokenUsage.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
        });

        const totalTokens = chat.messages.reduce((sum, msg) => sum + (msg.totalTokens || 0), 0);

        return res.status(200).json({
            success: true,
            message: "Chat found successfully",
            data: {
                chatPublicId: chat.publicId,
                title: chat.title,
                messages: chat.messages.map((msg) => ({
                    id: msg.id,
                    role: msg.role, // USER | ASSISTANT
                    content: msg.content,
                    promptTokens: msg.promptTokens || 0,
                    completionTokens: msg.completionTokens || 0,
                    totalTokens: msg.totalTokens || 0,
                    createdAt: msg.createdAt,
                })),
                tokenUsages: tokenUsages || 0,
                totalTokens: totalTokens || 0,
            },
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
            data: chats.map((chat) => ({
                    chatPublicId: chat.publicId,
                    title: chat.title,
                    createdAt: chat.createdAt,
                    userId: chat.userId
                })),
            
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