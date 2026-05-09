import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { createAxiosClient } from "../axios-client";


// Login
export async function loginService(data: LoginRequest): Promise<AuthResponse> {
  try {
    const axiosclient = await createAxiosClient();
    const response = await axiosclient.post("/auth/login", data);

    return {
      success: true,
      message: response.data.message,
      user: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed",
    };
  }
}

// Register
export async function registerService(data: RegisterRequest): Promise<AuthResponse> {
  try {
    const axiosclient = await createAxiosClient();
    const response = await axiosclient.post("/auth/register", data);

    return {
      success: true,
      message: response.data.message,
      user: response.data.data,
    };

  } catch (error: any) {

    console.log("Register Error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed",
    };
  }
}

// Logout
export async function logoutService(): Promise<{success: boolean;message?: string;}> {
  try {
    const axiosclient = await createAxiosClient();
    const response =  await axiosclient.post("/auth/logout");

    return {success: true};

  } catch (error: any) {

    return {
      success: false,
      message:
        error.response?.data?.message || "Logout failed",
    };
  }
}

