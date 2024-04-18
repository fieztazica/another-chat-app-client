'use client'

import LogoutButton from '@/components/auth/logout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

function UserBox() {
    const { data: user } = useUser()

    return (
        <div className="flex items-center justify-between pb-2 border-b w-full flex-wrap">
            <div className="flex items-center flex-1">
                <Avatar>
                    <AvatarFallback>
                        {user?.username.substring(0, 2) || 'AC'}
                    </AvatarFallback>
                </Avatar>
                <p className="ml-2 text-lg font-semibold items-center">
                    {user && `Welcome, ${user.username}`}
                </p>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size={'icon'}>
                        <Menu className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-48">
                    <Button
                        asChild
                        className="w-full justify-start"
                        variant="ghost"
                    >
                        <Link href="/change-password">Change Password</Link>
                    </Button>
                    <LogoutButton
                        className="w-full justify-start"
                        variant="ghost"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default UserBox
