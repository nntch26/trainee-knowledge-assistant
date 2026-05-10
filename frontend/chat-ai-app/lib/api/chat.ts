import { ApiResponse } from "@/types/api";
import { createAxiosClient } from "../axios-client";
import { handleApiError } from "../error-handler";
import { CreateChatResponse, GetChatResponse, GetMessageResponse } from "@/types/chat";


// createChat
export async function createChat(): Promise<CreateChatResponse> {
  try {
    const axiosClient = await createAxiosClient();
   const response = await axiosClient.post<CreateChatResponse>("/chat", {});

    return response.data;

  } catch (error: any) {
    return handleApiError(error, "Create chat failed");
  }

}


// get my chat
export async function getMyChats(): Promise<GetChatResponse> {
  try {
    const axiosClient = await createAxiosClient();
   const response = await axiosClient.get<GetChatResponse>("/chat");

    return response.data;

  } catch (error: any) {
    return handleApiError(error, "Create chat failed");
  }

}

// get chat by id
export async function getChatById(chatPublicId:string): Promise<GetMessageResponse>{
    try {
        const axiosClient = await createAxiosClient();
        const response = await axiosClient.get<GetMessageResponse>(`/chat/${chatPublicId}`);

        return response.data;

    } catch (error: any) {
        return handleApiError(error, "Chat failed");
    }
}
