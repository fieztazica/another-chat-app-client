import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components//ui/card'
import ResetPasswordForm from './resetPwdForm'

type Props = {
    params: { token: string }
}

function ResetPasswordPage({ params }: Props) {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center p-24">
            <Card>
                <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                    <CardDescription>
                        make a super duper safe password and remember it
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <ResetPasswordForm token={params.token} />
                    </div>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </main>
    )
}

export default ResetPasswordPage
