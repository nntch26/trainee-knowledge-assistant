
const { googleAi } = require("../lib/gemini"); 
const prisma  = require("../lib/prisma");
// const { streamText } = require("ai");

const generateResponse = async (userId, chatPublicId, userText ) => {

    // ค้นหาแชท chatid 
    const chat = await prisma.chat.findFirst({
        where: { publicId: chatPublicId,userId: userId, },
        include: { 
            messages: { orderBy: {createdAt: "asc",}}
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
                    text: userText,
                    type: "text",
                },
            },
        });

        // อัพเดท title แชท เป็นข้อความล่าสุด
        await prisma.chat.update({
            where: { id: chat.id },
            data: { title: userText.slice(0, 30) }, // ใช้ข้อความล่าสุด 30 ตัวอักษร เป็น title
        });

    
        // history เฉพาะข้อความ ก่อนหน้า 
        const history = chat.messages.slice(0, -1).map((m) => ({
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

        // สร้าง Gemini chat เรียก streamText
        const geminiChat = googleAi.chats.create({
            model: "gemini-2.5-flash", 
            history,
        });

        // // ส่งข้อความล่าสุด
        const response = await geminiChat.sendMessage({ message: userText });


        // console.log("Response from Gemini:", response);    
        const replyText = response.text; // ดึงข้อความที่ AI ตอบกลับ
        const usage = response.usageMetadata; // ข้อมูลการใช้ token
    

        // // บันทึกข้อความ ตอบกลับ Gemini
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
                    question: userText,
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