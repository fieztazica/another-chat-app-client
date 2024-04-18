'use client'

import useDeleteRoom from '@/hooks/useDeleteRoom'
import useMyRooms from '@/hooks/useMyRooms'
import { cn } from '@/lib/utils'
import { usePathname, redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type DeleteRoomButtonProps = {
    roomId: string
}

function DeleteRoomButton({
    roomId,
    className,
    children,
    ...props
}: DeleteRoomButtonProps &
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >) {
    const { refetch } = useMyRooms()
    const {
        mutate: deleteRoom,
        data,
        error,
        isPending,
        isError,
        isSuccess,
    } = useDeleteRoom()
    const pathname = usePathname()

    useEffect(() => {
        if (data) {
            refetch()
            if (pathname.includes(roomId)) redirect('/rooms')
        }
    }, [data])

    function onClickHandler() {
        deleteRoom({ id: roomId })
    }

    return (
        <div
            className={cn('hover:cursor-pointer', className)}
            onClick={(e) => onClickHandler()}
            {...props}
        >
            {children}
        </div>
    )
}

export default DeleteRoomButton
