'use client'

import LogoutButton from '@/components/auth/logout'
import { Button } from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import Link from 'next/link'
import React from 'react'

function UserBox() {
    const { data: user } = useUser()

    return (
        <div className="flex items-center justify-between pb-2 border-b w-full flex-wrap">
            <p className="text-lg font-semibold flex-1">
                {user && `Welcome, ${user.username}`}
            </p>
            <Button asChild variant="link">
                <Link href="/change-password">Change Password</Link>
            </Button>
            <LogoutButton variant="ghost" />
        </div>
    )
}

export default UserBox
