'use client'

import { Button } from '@/components/ui/button'
import useRooms from '@/hooks/useRooms'
import useUser from '@/hooks/useUser'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

function RoomList() {
    const { data: me } = useUser()
    const { data: rooms, isFetching, refetch } = useRooms(`owner=${me?._id}`)

    useEffect(() => {
        refetch()
    }, [me, refetch])

    return (
        <div className="flex flex-col space-y-2">
            <h3 className="flex items-center underline font-semibold text-xl mt-2">
                Rooms{' '}
                {isFetching ? (
                    <Loader className="ml-2 animate-spin" />
                ) : (
                    rooms.length
                )}
            </h3>
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
