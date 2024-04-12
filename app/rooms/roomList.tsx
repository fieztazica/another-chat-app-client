'use client'

import useRooms from '@/hooks/useRooms'
import Link from 'next/link'

function RoomList() {
    const { data: rooms } = useRooms()

    return (
        <div className="flex flex-col space-y-2">
            <h3 className="underline font-semibold text-xl mt-2">
                Rooms {rooms.length}
            </h3>
            {rooms.length > 0 &&
                rooms.map((r) => {
                    return (
                        <Link key={`room_${r._id}`} href={`/rooms/${r.roomId}`}>
                            <div className="flex w-full px-2 py-1 rounded-md border">
                                {r.name}
                            </div>
                        </Link>
                    )
                })}
        </div>
    )
}

export default RoomList
