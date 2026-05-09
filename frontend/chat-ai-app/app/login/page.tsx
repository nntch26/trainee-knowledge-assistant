import { LoginForm } from '@/components/form/loginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function Login() {

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-sky-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          <CardTitle className="text-2xl">AI Chat</CardTitle>
          <CardDescription>
            Login to start chatting with AI
          </CardDescription>
        </CardHeader>

        <CardContent>
            
            {/* Login Form */}
            <LoginForm />

             <p className="text-center text-sm text-muted-foreground mt-4">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="text-primary hover:underline"
                >
                    Register
                </Link>
            </p>
        </CardContent>
      </Card>
    </div>
    
    </>
  )
}
