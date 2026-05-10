import { ChatPage } from "@/components/chat-page";

interface ChatPageProps {
  params: Promise<{
    chatPublicId: string;
  }>;
}

export default async function Chat({ params }: ChatPageProps) {
  const { chatPublicId } = await params;

  return <ChatPage chatPublicId={chatPublicId} />;
}