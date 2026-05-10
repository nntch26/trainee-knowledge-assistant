"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { sendMessageService } from "@/lib/api/chat";
import {
  Send,
  Bot,
  User,
  Loader2,
  Trash2,
  Sparkles,
  Coins,
} from "lucide-react";
import {  Message } from "@/types/chat";
import MessageItem from "./chat/MessageItem";

interface ChatPageProps {
  chatPublicId: string;
  initialMessages: Message[];
  initialTitle: string;
  initialSessionTokens: number;
}

export function ChatPage({ 
  chatPublicId,initialTitle, initialMessages, initialSessionTokens 
}: ChatPageProps) {

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [title, setTitle] = useState(initialTitle);
  const [sessionTokens, setSessionTokens] = useState(initialSessionTokens);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  // // ----------- Send message ---------------
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const messageText = input;

    // push user message
    const userMessage: Message = {
      role: "USER",
      content: {
        text: messageText,
        type: "text",
      },
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {

      const payload = {
        chatPublicId,
        message: messageText,
      }

      const result = await sendMessageService(payload);

      if (!result.success) return;

      const assistant = result.data;

      // 2. push assistant message
      const assistantMessage: Message = {
          role: "ASSISTANT",
          content: assistant?.message?.content || { text: "", type: "text" },
          promptTokens: assistant?.message?.promptTokens ?? 0,
          completionTokens: assistant?.message?.completionTokens ?? 0,
          totalTokens: assistant?.message?.totalTokens ?? 0,
          createdAt: assistant?.message?.createdAt ?? new Date().toISOString(),
      };

      // update messages
      setMessages((prev) => [...prev, assistantMessage]);

      // update session tokens
      setSessionTokens((prev) => prev + (assistant?.message?.totalTokens ?? 0));

    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {user?.username || "User"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm">
            <Coins className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">
              Session Tokens:
            </span>
            <span className="font-mono font-medium">
              {sessionTokens.toLocaleString()}
            </span>
          </div>

          {/* <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button> */}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-medium mb-2">
                Start a conversation
              </h2>
              <p className="text-muted-foreground">
                Send a message to begin chatting with AI
              </p>
            </div>
          </div>
        ) : (

          // chat list
          <div className="w-full flex flex-col p-4">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>
        )}


        {/* Loading */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-500" />
            </div>

            {/* <Card className="p-3 bg-card">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">
                  AI is typing...
                </span>
              </div>
            </Card> */}
            <Card className="px-4 py-3 bg-card">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>


      {/* Input */}
      <div className=" border-t bg-card p-6">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 max-w-3xl mx-auto items-center"
        >
          <Input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 p-5 rounded-full"
          />

          <Button
            className="rounded-full"
            type="submit"
            disabled={
              isLoading || !input.trim()
            }
          >
            <Send className="w-4 h-4 " />
          </Button>
        </form>
      </div>
    </div>
  );
}