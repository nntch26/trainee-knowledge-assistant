import { ApiResponse } from "./api";

export interface ChatItem {
    id ?:string
    userId ?:string
    chatPublicId: string
    title: string
    updatedAt?: string
    createdAt?:string
}



export type CreateChatResponse = ApiResponse<ChatItem>;
export type GetChatResponse = ApiResponse<ChatItem>;


// ---------- massage ----------

export interface Message {
  id: number;
  role: "USER" | "ASSISTANT";
  content: {
    text: string;
    type: string;
  };
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  createdAt: string;
}

export interface MessageResponse {
    chatPublicId: string;
    title: string;
    messages: Message[];
    totalTokens: number;
}

export type GetMessageResponse = ApiResponse<MessageResponse>;

