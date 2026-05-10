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