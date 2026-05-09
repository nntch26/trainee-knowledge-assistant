"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "./sidebar"
import { Upload, FileText, Send, Bot, User, Loader2, X } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  content: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  tokens?: number
}

export function UploadPage() {
  const [file, setFile] = useState<UploadedFile | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const estimateTokens = (text: string) => {
    return Math.ceil(text.split(/\s+/).length * 1.3)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Only allow PDF and TXT
    const allowedTypes = ["application/pdf", "text/plain"]
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or TXT file")
      return
    }

    setIsUploading(true)

    // Simulate file processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Read file content (simplified for TXT)
    let content = ""
    if (selectedFile.type === "text/plain") {
      content = await selectedFile.text()
    } else {
      content = `[PDF Document: ${selectedFile.name}] This is a simulated PDF content for demo purposes. In a real application, you would use a PDF parsing library to extract text.`
    }

    setFile({
      name: selectedFile.name,
      size: selectedFile.size,
      content: content.slice(0, 2000), // Limit content for demo
    })
    setIsUploading(false)
    setMessages([])
  }

  const removeFile = () => {
    setFile(null)
    setMessages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !file) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      tokens: estimateTokens(input),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response based on document
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const responses = [
      `Based on the document "${file.name}", I can provide information about the content. What specific aspect would you like me to explain?`,
      `Looking at your document, I found relevant information. The document discusses various topics that I can help explain.`,
      `I've analyzed "${file.name}" and can answer questions about its content. Feel free to ask more specific questions.`,
      `According to the uploaded document, there are several key points. Would you like me to summarize them?`,
    ]

    const aiResponse = responses[Math.floor(Math.random() * responses.length)]

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      tokens: estimateTokens(aiResponse),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <h1 className="text-lg font-semibold">Document Q&A</h1>
          <p className="text-sm text-muted-foreground">
            Upload a document and ask questions about it
          </p>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Upload Area */}
          {!file ? (
            <div className="max-w-xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-sm text-muted-foreground">Processing file...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <p className="font-medium mb-1">Click to upload</p>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF and TXT files
                        </p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {/* File Info */}
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={removeFile}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Messages */}
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <Card className="p-6 text-center">
                    <Bot className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="font-medium">Ask about your document</p>
                    <p className="text-sm text-muted-foreground">
                      Type a question below to get started
                    </p>
                  </Card>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <Card
                        className={`max-w-[70%] p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.tokens && (
                          <p
                            className={`text-xs mt-1 ${
                              message.role === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {message.tokens} tokens
                          </p>
                        )}
                      </Card>
                      {message.role === "user" && (
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <Card className="p-3 bg-card">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Analyzing document...</span>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {file && (
          <div className="border-t bg-card p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your document..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
