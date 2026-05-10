import { createAxiosClient } from "../axios-client";
import { createServerAxiosClient } from "../axios-server";
import { handleApiError } from "../error-handler";
import { CreateChatResponse, GetChatResponse, GetMessageResponse, MessagePayload, SendMessageResponse } from "@/types/chat";


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
        const axiosClient = await createServerAxiosClient();
        const response = await axiosClient.get<GetMessageResponse>(`/chat/${chatPublicId}`);

        return response.data;

    } catch (error: any) {
        return handleApiError(error, "Chat failed");
    }
}


// send message
export async function sendMessageService(data:MessagePayload) {

  try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.post<SendMessageResponse>("/chat/message", data);

      return response.data;

  } catch (error: any) {
      return handleApiError(error, "Send Message failed");
  }
  
}