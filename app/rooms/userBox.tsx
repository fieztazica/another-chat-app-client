'use client'

import LogoutButton from '@/components/auth/logout'
import useUser from '@/hooks/useUser'
import React from 'react'

function UserBox() {
    const { data: user } = useUser()

    return (
        <div className="flex items-center justify-between pb-2 border-b w-full">
            <p className="text-lg font-semibold flex-1">
                {user && `Welcome, ${user.username}`}
            </p>
            <LogoutButton variant="ghost" />
        </div>
    )
}

export default UserBox
