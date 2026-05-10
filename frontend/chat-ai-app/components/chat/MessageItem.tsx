import { Bot, Coins } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer"; // import Component ด้านบนมาใช้
import { Card } from "@/components/ui/card"; // ปรับ path ให้ตรงกับโปรเจกต์ของคุณ
import { Message } from "@/types/chat";

export default function MessageItem({ message } : { message: Message }) {
  const isUser = message.role === "USER";

  return (
    <div className={`flex gap-3 w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      )}

      {/* Message Area */}
      <div className={`max-w-[85%] md:max-w-[75%] ${isUser ? "flex flex-col items-end" : "flex flex-col items-start"}`}>
        
        {/* Content Bubble */}
        {isUser ? (
            <>
            <Card className="px-5 py-3 bg-blue-600 text-white rounded-3xl rounded-tr-sm shadow-sm border-none">
                <div className="text-sm whitespace-pre-wrap break-words">
                {message.content.type === "markdown" ? (
                    <MarkdownRenderer content={message.content.text} />
                ) : (
                    message.content.text
                )}
                </div>
                {/* วันที่ */}
                
            </Card>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {new Date(message.createdAt).toLocaleString("th-TH", {
                        dateStyle: "short",
                        timeStyle: "short",
                    })}
            </div>
            </>
          
        ) : (
          <div className="px-2 py-1 w-full">
            {message.content.type === "markdown" ? (
              <MarkdownRenderer content={message.content.text} />
            ) : (
              <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                {message.content.text}
              </p>
            )}
          </div>
        )}

        {/* Token Usage */}
        {message.completionTokens !== undefined && message.completionTokens > 0 && (

          <div className="mt-2 ml-2 flex items-center gap-3 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                {/* Token Usage */}
                <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{message.completionTokens.toLocaleString()} tokens</span>
                </div>

                {/* Separator */}
                <span>•</span>

                {/* Created At */}
                <div className="flex items-center">
                    <span>
                    {new Date(message.createdAt).toLocaleString("th-TH", {
                        dateStyle: "short",
                        timeStyle: "short",
                    })}
                    </span>
                </div>
                </div>
        )}
        
      </div>
    </div>
  );
}