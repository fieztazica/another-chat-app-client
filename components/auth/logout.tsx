'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from '../ui/use-toast'
import { Button, ButtonProps } from '../ui/button'

function LogoutButton({ ...props }: ButtonProps) {
    const router = useRouter()

    function onSubmit() {
        fetch(`/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
                toast({
                    variant: 'destructive',
                    title: 'Something went wrong',
                    description: `${error}`,
                })
            })
    }

    return (
        <Button onClick={onSubmit} {...props}>
            Logout
        </Button>
    )
}

export default LogoutButton
