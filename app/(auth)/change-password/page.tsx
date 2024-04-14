import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components//ui/card'
import ChangePasswordForm from './changePwdForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ChangePasswordPage() {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center p-24">
            <Button asChild variant={'link'}>
                <Link href="/rooms">Back to rooms</Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Change your password</CardTitle>
                    <CardDescription>
                        make a super duper safe password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <ChangePasswordForm />
                    </div>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </main>
    )
}

export default ChangePasswordPage
