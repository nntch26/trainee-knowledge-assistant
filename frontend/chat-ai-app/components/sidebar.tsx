"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  MessageSquare,
  Upload,
  LogOut,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { getMyChats } from "@/lib/api/chat"
import { useChats } from "@/hooks/use-chats"
import {  ChatItem } from "@/types/chat"


export function Sidebar() {
  const { logout, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [chats, setChats] = useState<ChatItem[]>([])
  const [isLoadingChats, setIsLoadingChats] = useState(true)
  const { createNewChat, isCreatingChat } = useChats();

  const navItems = [
    { href: "/upload", icon: Upload, label: "Upload" },
  ]

  // โหลดรายการแชททั้งหมดของ user
  useEffect(() => {
    const fetchChats = async () => {
      const result = await getMyChats()

      if (result.success && result.data) {
        const chats = Array.isArray(result.data) ? result.data : [result.data]
        setChats(chats)
      }

      setIsLoadingChats(false)
    }

    fetchChats()
  }, [])


  // สร้างแชทใหม่
  const handleNewChat = async () => {
    const result = await createNewChat();

    if (!result.success) {
      alert(result.message);
    }

    const newChat = result?.data

    // เพิ่ม chat ใหม่เข้า state
    if (newChat) {
      setChats((prev) => [newChat, ...prev])
    }
  };


  // Logout
  const handleLogout = async () => {
    const result = await logout()

    if (!result.success) {
      alert(result.message || "Logout failed. Please try again.")
    }

    router.push("/login")
  }

  return (
    <div className="w-64 bg-card border-r flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-sky-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg">AI Chat</span>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-3 border-b">
        <Button
          onClick={handleNewChat}
          disabled={isCreatingChat}
          className="w-full justify-start gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {isCreatingChat ? "Creating..." : "New Chat"}
        </Button>
      </div>

      {/* Navigation + Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Static Navigation */}
        <nav className="p-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 cursor-pointer"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Chat List */}
        <div className="px-3 pb-3">
          <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Chats
          </p>

          {isLoadingChats ? (
            <p className="px-2 text-sm text-muted-foreground">
              Loading...
            </p>
          ) : chats.length === 0 ? (
            <p className="px-2 text-sm text-muted-foreground">
              No chats yet
            </p>
          ) : (
            <div className="space-y-1">
              {chats.map((chat, index) => {
                const href = `/chat/${chat.chatPublicId}`
                const isActive = pathname === href

                return (
                  <Link key={chat.chatPublicId ?? `chat-${index}`} href={href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start cursor-pointer"
                    >
                      <span className="truncate text-sm">
                        {chat.title || "New Chat"}
                      </span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* User & Logout */}
      <div className="p-3 border-t">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.username || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}