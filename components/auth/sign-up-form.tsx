'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signUpSchema } from '@/lib/zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '../ui/checkbox'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

function SignUpForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values,
            }),
        })
            .then((r) => r.json())
            .then((r) => {
                if (!r.success) {
                    throw new Error(r.data)
                }

                toast({
                    variant: 'default',
                    title: 'Success',
                })

                router.refresh()
            })
            .catch((error) => {
                form.setError('root', {
                    message: `${error}`,
                })
                toast({
                    variant: 'destructive',
                    title: 'Something went wrong',
                    description: `${error}`,
                })
            })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-[350px]"
            >
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        autoFocus
                                        placeholder="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        autoFocus
                                        placeholder="username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm your password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="confirm password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SignUpForm
