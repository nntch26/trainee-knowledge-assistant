import { HttpError } from "@/types/api";
import axios, { AxiosError } from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function createAxiosClient() {
  if (!BASE_URL) throw new Error("Base URL is required");

    // สร้าง axios instance
    const client = axios.create({
        baseURL: BASE_URL,
        timeout: 15000, // 15 วินาที
        withCredentials: true, // ส่ง httpOnly cookie อัตโนมัติ
        headers: {
            "Content-Type": "application/json",
        },
    });


    client.interceptors.response.use(
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

  return client;
}