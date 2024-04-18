'use client'

import { Button } from '@/components/ui/button'
import useMyRooms from '@/hooks/useMyRooms'
import { Loader, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import DeleteRoomButton from './deleteRoomButton'
function RoomList() {
    const { data: rooms, isFetching, refetch } = useMyRooms()
    return (
        <div className="flex flex-col space-y-2">
            <h3 className="flex justify-between items-center font-semibold text-xl mt-2">
                <Link href="/rooms">
                    <span>Rooms {rooms.length}</span>
                </Link>
                {isFetching ? (
                    <Loader className="animate-spin" />
                ) : (
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => refetch()}
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                )}
            </h3>
            {rooms.length > 0 &&
                rooms.map((r) => {
                    return (
                        <ContextMenu key={`room_${r._id}`}>
                            <ContextMenuTrigger asChild>
                                <Button variant={'outline'} asChild>
                                    <Link href={`/rooms/${r.roomId}`}>
                                        <div>
                                            {r.roomId} - {r.name}
                                        </div>
                                    </Link>
                                </Button>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem>Edit</ContextMenuItem>
                                <DeleteRoomButton roomId={r._id} />
                                <ContextMenuSeparator />
                                <ContextMenuItem>Copy room ID</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    )
                })}
        </div>
    )
}

export default RoomList
