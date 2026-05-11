"use server";

import { HttpError } from "@/types/api";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL || "";

export async function createServerAxiosClient() {
  if (!BASE_URL) {
    throw new Error("Base URL is required");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

   // สร้าง axios instance
    const server = axios.create({
        baseURL: BASE_URL,
        timeout: 15000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Cookie: token ? `token=${token}` : "",
        },
    });

    // console.log("axios server", server)

    server.interceptors.response.use(
         (response) => response,
         (error: AxiosError) => {
         // Handle network errors (no response from server)
         if (!error.response) {
             return Promise.reject(
             new HttpError("Network error: ไม่สามารถเชื่อมต่อ server ได้", 500),
             );
         }
 
         switch (error.response.status) {
             case 401:
             return Promise.reject(new HttpError("Unauthorized", 401));
             case 403:
             return Promise.reject(new HttpError("Forbidden", 403));
             case 404:
             return Promise.reject(new HttpError("Not Found", 404));
             case 504:
             return Promise.reject(new HttpError("Timeout", 504));
             case 500: {
             const backendMessage =
                 (error.response?.data as any)?.message || "Internal Server Error";
             return Promise.reject(new HttpError(backendMessage, 500));
             }
             default: {
             const backendMessage =
                 (error.response?.data as any)?.message ||
                 "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
             return Promise.reject(
                 new HttpError(backendMessage, error.response.status),
             );
             }
         }
         },
     );

    return server;
}