// hooks/use-chat.ts
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createChat} from "@/lib/api/chat";

export function useChats() {
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  // สร้างแชทใหม่
  const createNewChat = async () => {
    setIsCreatingChat(true);

    try {
      const result = await createChat();

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Failed to create chat",
        };
      }

      // ไปยังหน้า chat ใหม่
      router.push(`/chat/${result.data?.chatPublicId}`);

      return {
        success: true,
        data: result.data, // { chatPublicId, title }
      };

    } finally {
      setIsCreatingChat(false);
    }
  };

  return {
    createNewChat,
    isCreatingChat,
  };
}