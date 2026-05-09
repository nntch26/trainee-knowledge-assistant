// auth-context.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { loginService, registerService, logoutService } from "@/lib/api/auth"
import { User } from "@/types/user"


interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<{ success: boolean; message?: string }>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // เช็คว่ามี user เคย login ยัง
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      try {
        // ถ้า parse สำเร็จ ก็เซ็ต user จาก localStorage
        setUser(JSON.parse(storedUser))

      } catch {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])


  // Login function
  const login = async (username: string, password: string) => {
    const result = await loginService({ username, password })
    
    if (result.success && result.user) {
      setUser(result.user)
      localStorage.setItem("user", JSON.stringify(result.user))
      return { success: true }
    }
    
    return { success: false, message: result.error}
  }

  // Register function
  const register = async (username: string, email: string, password: string) => {
    const result = await registerService({ username, email, password })

    console.log("Register result:", result)
    
    if (result.success && result.user) {
      setUser(result?.user)
      localStorage.setItem("user", JSON.stringify(result.user))

      return { success: true }
    }
    
    return { success: false, message: result.error }
  }

  // Logout function
  const logout = async () => {
    const result = await logoutService()

    if (!result.success) {
      return { success: false, message: result.error }
    }
    setUser(null)
    localStorage.removeItem("user")

    return { success: true }

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
