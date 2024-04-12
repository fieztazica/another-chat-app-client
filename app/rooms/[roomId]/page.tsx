'use client'

import useSocket, { SocketEventNames } from '@/hooks/useSocket'
import React, { useEffect, useState } from 'react'
import MessagesBox from './messagesBox'

function Room({ params }: { params: { roomId: string } }) {
    const [roomData, setRoomData] = useState<Room>()

    const { isConnected, socket, transport } = useSocket(
        `http://localhost:5000/rooms/${params.roomId}`
    )

    useEffect(() => {
        socket.on(SocketEventNames.Connected, (data, ack) => {
            console.log(data)
            setRoomData(data)
            document.title = data.name
        })
    }, [socket])

    if (!isConnected) {
        return (
            <main className="flex justify-center items-center h-full">
                Room is either connecting or does not exist...
            </main>
        )
    }

    return (
        <main className="h-full">
            <div className="flex items-center justify-between border-b px-4 py-2">
                <div>Room ID: {roomData?.roomId}</div>
                <div>{roomData?.name}</div>
                <div>Owner: {roomData?.owner.username}</div>
            </div>
            <MessagesBox socket={socket} />
        </main>
    )
}

export default Room
