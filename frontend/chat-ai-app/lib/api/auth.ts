import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { createAxiosClient } from "../axios-client";
import { handleApiError } from "../error-handler";


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
    return handleApiError(error, "Login failed");
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
    return handleApiError(error, "Registration failed");
  }
}

// Logout
export async function logoutService(): Promise<{success: boolean;error?: string;}> {
  try {
    const axiosclient = await createAxiosClient();
    const response =  await axiosclient.post("/auth/logout");

    return {success: true};

  } catch (error: any) {
    return handleApiError(error, "Logout failed");
    
  }
}

