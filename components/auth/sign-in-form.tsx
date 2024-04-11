'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signInSchema } from '@/lib/zod'

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

function SignInForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
    })

    function onSubmit(values: z.infer<typeof signInSchema>) {
        fetch(`/api/auth/login`, {
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
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Remember me</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm
