'use client'

import { changePasswordSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

function ChangePasswordForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
    })

    function onSubmit(values: z.infer<typeof changePasswordSchema>) {
        fetch(`/api/auth/change-password`, {
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="current password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="new password"
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
                                <FormLabel>Confirm your new password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="confirm new password"
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
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ChangePasswordForm
