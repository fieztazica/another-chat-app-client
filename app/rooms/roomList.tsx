'use client'

import { Button } from '@/components/ui/button'
import useMyRooms from '@/hooks/useMyRooms'
import { Loader, RotateCcw } from 'lucide-react'
import Link from 'next/link'

function RoomList() {
    const { data: rooms, isFetching, refetch } = useMyRooms()

    return (
        <div className="flex flex-col space-y-2">
            <Link href="/rooms">
                <h3 className="flex justify-between items-center font-semibold text-xl mt-2">
                    <span>Rooms {rooms.length}</span>
                    {isFetching ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            onClick={() => refetch()}
                        >
                            <RotateCcw className='w-4 h-4' />
                        </Button>
                    )}
                </h3>
            </Link>
            {rooms.length > 0 &&
                rooms.map((r) => {
                    return (
                        <Button
                            variant={'outline'}
                            asChild
                            key={`room_${r._id}`}
                        >
                            <Link href={`/rooms/${r.roomId}`}>
                                <div>
                                    {r.roomId} - {r.name}
                                </div>
                            </Link>
                        </Button>
                    )
                })}
        </div>
    )
}

export default RoomList
