'use client'

import { SocketEventNames } from '@/hooks/useSocket'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import Presences from './presences'
import { Separator } from '@/components/ui/separator'

type Props = {
    socket: Socket
    room: Room
}

function RoomSettings({ room, socket }: Props) {
    const [presences, setPresences] = useState<User[]>([])
    useEffect(() => {
        socket.on(SocketEventNames.Presence, (data, ack) => {
            console.log(data)
            setPresences(data)
        })
    }, [socket])

    return (
        <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight p-2">
                {room.name}
            </h3>
            <Separator className="mb-2"/>
            <Presences room={room} socket={socket} />
        </div>
    )
}

export default RoomSettings
