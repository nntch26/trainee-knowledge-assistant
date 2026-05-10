
const { ai } = require("../lib/gemini"); 
const prisma  = require("../lib/prisma");

const generateResponse = async (userId, chatPublicId, messages) => {

    // ค้นหาแชท chatid 
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
        throw new Error("Chat not found");
    }

    try{
        // บันทึกข้อความ ผู้ใช้
        await prisma.chatMessage.create({
            data: {
                chatId: chat.id,
                role: "USER",
                content: {
                    text: messages,
                    type: "text",
                },
            },
        });

        // อัพเดท title แชท เป็นข้อความล่าสุด
        await prisma.chat.update({
            where: { id: chat.id },
            data: { title: messages.slice(0, 30) }, // ใช้ข้อความล่าสุด 30 ตัวอักษร เป็น title
        });


        // โหลด history chat ใหม่
        const updatedChat = await prisma.chat.findUnique({
            where: { id: chat.id },
            include: {
            messages: {
                orderBy: { createdAt: "asc" },
            },
            },
        });

        // history เฉพาะข้อความ ก่อนหน้า 
        const history = updatedChat.messages.slice(0, -1).map((m) => ({
            // แปลง role 
            role: m.role === "USER" ? "user" : "model",
            parts: [
            {
                text:
                typeof m.content === "string"
                    ? m.content
                    : m.content?.text || JSON.stringify(m.content),
            },
            ],
        }));

        // สร้าง Gemini chat
        const geminiChat = ai.chats.create({
            model: "gemini-2.5-flash", 
            history,
        });


        // ส่งข้อความล่าสุด
        const response = await geminiChat.sendMessage({ message: messages });


        console.log("Response from Gemini:", response);    
        const replyText = response.text; // ดึงข้อความที่ AI ตอบกลับ
        const usage = response.usageMetadata; // ข้อมูลการใช้ token
    

        // บันทึกข้อความ ตอบกลับ Gemini
        const assistantMessage = await prisma.chatMessage.create({
            data: {
                chatId: chat.id,
                role: "ASSISTANT",
                content: {
                    text: replyText,
                    type: "markdown",
                },
                promptTokens: usage?.promptTokenCount || 0, // token ที่ใช้ prompt
                completionTokens: usage?.candidatesTokenCount || 0, // token ที่ใช้ตอบกลับ
                totalTokens: usage?.totalTokenCount || 0, // token รวม
            },
        });

        // บันทึก token ที่ใช้ไป
        if (usage) {
            await prisma.tokenUsage.create({
                data: {
                    userId,
                    type: "chat",
                    question: messages,
                    inputTokens: usage.promptTokenCount || 0,
                    outputTokens: usage.candidatesTokenCount || 0,
                },
            });
        }


        return {
            chatPublicId: chat.publicId,
            assistantMessage
        };
        

    }catch (err) {
        console.error("Error in generateResponse:", err);
        throw err; // โยน error 
    }        
};




module.exports = {
  generateResponse, 
}