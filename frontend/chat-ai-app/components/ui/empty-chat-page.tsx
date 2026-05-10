

import { Bot, Plus } from "lucide-react";

export function EmptyChatPage() {

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 text-blue-500" />
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          Welcome to AI Chat
        </h1>

        <p className="text-muted-foreground mb-6">
          You don't have any chats yet.
          Create a new chat to get started.
        </p>

      </div>
    </div>
  );
}