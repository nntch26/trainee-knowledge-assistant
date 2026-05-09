
const { ai } = require("../lib/gemini"); 
const prisma  = require("../lib/prisma");

const generateResponse = async (userId, chatId, messages) => {

    try{
        // บันทึกข้อความ ผู้ใช้
        await prisma.chatMessage.create({
            data: {
                chatId: Number(chatId),
                role: "USER",
                content: {
                    text: messages,
                    type: "text",
                },
            },
        });
    
    
        // แปลงรูปแบบข้อความ
        const contents  = messages.map((m) => ({
            // แปลง role 
            role: m.role === "USER" ? "user" : "model",
            parts: [{ text: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }],
        }));
    
        console.log("Contents to send to Gemini:", contents);
    
        // เรียกใช้ Gemini API ส่งข้อความไป
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: contents,
        });
    
        console.log("Response from Gemini:", response);

        const replyText = response.text; // ดึงข้อความที่ AI ตอบกลับ
    
        // บันทึกข้อความ ตอบกลับ Gemini
        await prisma.chatMessage.create({
            data: {
                chatId: Number(chatId),
                role: "ASSISTANT",
                content: {
                    text: replyText,
                    type: "text",
                },
            },
        });

        // บันทึก token ที่ใช้ไป
        // const usage = response.usageMetadata;

        // if (usage) {
        //     await prisma.tokenUsage.create({
        //         data: {
        //         userId,
        //         type: "chat",
        //         question: messages,
        //         inputTokens: usage.promptTokenCount || 0,
        //         outputTokens: usage.candidatesTokenCount || 0,
        //         },
        //     });
        // }


        return replyText;
        

    }catch (err) {
        console.error("Error in generateResponse:", err);
        throw err; // โยน error 
    }        
};




module.exports = {
  generateResponse, 
}