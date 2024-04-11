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
                    {isLogin ? <SignInForm /> : <SignUpForm />}
                </CardContent>
                <CardFooter>
                    <div className="flex items-center space-x-2">
                        <span
                            className="hover:underline cursor-pointer"
                            onClick={() => setIsLogin((r) => !r)}
                        >
                            {isLogin
                                ? "Don't have an account? Register now!"
                                : 'Already have one?'}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AuthSwitcher
