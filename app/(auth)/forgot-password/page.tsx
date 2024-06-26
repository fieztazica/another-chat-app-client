import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components//ui/card'
import ForgotPasswordForm from './forgotPwdForm'

function ForgotPasswordPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-24">

            <Card>
                <CardHeader>
                    <CardTitle>Forgot password</CardTitle>
                    <CardDescription>
                        {"accidentally forgot your password? Don't worry"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <ForgotPasswordForm />
                    </div>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </main>
  )
}

export default ForgotPasswordPage
