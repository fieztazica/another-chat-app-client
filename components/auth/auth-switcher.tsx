'use client'

import React, { useState } from 'react'
import SignInForm from './sign-in-form'
import SignUpForm from './sign-up-form'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'

function AuthSwitcher() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{isLogin ? 'Sign In' : 'Sign Up'}</CardTitle>
                    <CardDescription>
                        {isLogin
                            ? 'Welcome back to Another Chat App'
                            : 'Have fun with Another Chat App'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-center'>{isLogin ? <SignInForm /> : <SignUpForm />}</div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center">
                        <Button
                            onClick={() => setIsLogin((r) => !r)}
                            variant={'link'}
                        >
                            {isLogin
                                ? "Don't have an account?"
                                : 'Already have one?'}
                        </Button>
                        <Button asChild variant={'link'}>
                            <Link href="/forgot-password">
                                Forgot your password?
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AuthSwitcher
