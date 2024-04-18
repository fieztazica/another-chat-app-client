'use client'
import useMyRooms from '@/hooks/useMyRooms'
import { Loader, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import {
    ContextMenuItem,
} from '@/components/ui/context-menu'
import useDeleteRoom from '@/hooks/useDeleteRoom'
interface DeleteRoomButtonProps {
    roomId: string;
}
function deleteRoomButton({ roomId } : DeleteRoomButtonProps) {
    const { refetch } = useMyRooms()
    const {
        mutate: deleteRoom,
        data,
        error,
        isPending,
        isError,
        isSuccess,
    } = useDeleteRoom()
    return (
        <ContextMenuItem onClick={(e) => {
            e.preventDefault()
            deleteRoom({ id: roomId })
            refetch()
        }}>Delete</ContextMenuItem>
    )
}

export default deleteRoomButton