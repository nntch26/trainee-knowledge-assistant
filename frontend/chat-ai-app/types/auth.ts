

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  error?:string
  user?: {
    id: string
    email: string
    username: string
  }
}