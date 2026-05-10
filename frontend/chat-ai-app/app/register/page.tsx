
import { RegisterForm } from '@/components/form/registerForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Sparkles } from 'lucide-react'
import Link from 'next/link'


export default function Register() {

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">

        {/* header */}
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-sky-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Register to start chatting with AI
          </CardDescription>
        </CardHeader>

        <CardContent>

          {/* Registration form */}
          <RegisterForm />
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
    
    </>
  )
}
