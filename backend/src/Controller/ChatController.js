const prisma  = require("../lib/prisma");
const { generateResponse } = require("../services/chatService");


// get chat by id ประววัติแชท
const getChatById = async (req, res) => {
    try {
        const { chatpublicId } = req.params;
        const userId = req.user.id;

        // ค้นหาแชท chatid
        const chat = await prisma.chat.findUnique({
            where: {
                publicId: chatpublicId,
            },
        });

        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        // ดึงข้อความทั้งหมดของแชทนี้
        const chatMessages = await prisma.chatmessage.findMany({
            where: {
                chatId: Number(chatpublicId),
                userId: userId
            }
        });

        
        return res.status(200).json({
            message: "Chat found successfully",
            data: {
                chatpublicId: chat.publicId,
                messages: chatMessages
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Cannot find chat" });
    }
};

// create chat 
const createChat = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // สร้างแชทใหม่
        const chat = await prisma.chat.create({data: {userId}, });


        return res.status(201).json({
            message: "Chat created successfully",
            data:{
                // chatId: chat.id,
                chatpublicId: chat.publicId,
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
    const { messages, chatId } = req.body;
    const userId = req.user.id;

    if (!userId || !chatId) {
      return res.status(400).json({ error: 'Missing userId or chatId' });
    }
    // เรียก Service
    const reply = await generateResponse(userId, chatId, messages);

    return res.status(200).json({
        message: "Message sent successfully",
        data:{
            reply: reply,
        }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "chat failed" });
  }
};




module.exports = {
    createChat,
    sendMessage,
    getChatById,
}