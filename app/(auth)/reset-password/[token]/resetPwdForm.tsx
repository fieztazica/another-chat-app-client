'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { resetPasswordSchema } from '@/lib/zod'

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
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
    token: string
}

function ResetPasswordForm({ token }: Props) {
    const router = useRouter()
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
    })

    function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        fetch(`/api/auth/password-reset/${token}`, {
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
                        name="newPassword"
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
                        name="confirmNewPassword"
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
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ResetPasswordForm
