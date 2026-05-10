
// app/chat/[chatPublicId]/page.tsx
import { ChatPage } from "@/components/chat-page";
import { getChatById } from "@/lib/api/chat";


interface ChatPageProps {
  params: Promise<{
    chatPublicId: string;
  }>;
}

export default async function Chat({ params }: ChatPageProps) {
  const { chatPublicId } = await params;

  // ดึง chat history
  const result = await getChatById(chatPublicId);


  return <ChatPage 
      chatPublicId={chatPublicId} 
      initialTitle={result.data?.title || "New Chat"}
      initialMessages={result.data?.messages || []}
      initialSessionTokens={result.data?.totalTokens || 0}
    />;
}