'use client'

import useSocket, { SocketEventNames } from '@/hooks/useSocket'
import React, { useEffect, useState } from 'react'
import MessagesBox from './messagesBox'
import ChatInput from './chatInput'

function Room({ params }: { params: { roomId: string } }) {
    const [roomData, setRoomData] = useState<Room>()

    const { isConnected, socket, transport } = useSocket(
        `http://localhost:5000/rooms/${params.roomId}`
    )

    useEffect(() => {
        socket.on(SocketEventNames.Connected, (data, ack) => {
            console.log(data)
            setRoomData(data.room)
            document.title = data.room.name
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
        <main className="flex flex-col shrink-0 h-full">
            <div className="flex items-center justify-between border-b px-4 py-2">
                <div>Room ID: {roomData?.roomId}</div>
                <div>{roomData?.name}</div>
                <div>Owner: {roomData?.owner.username}</div>
            </div>
            <div className='flex-1 h-full overflow-y-auto'>
                <MessagesBox socket={socket} />
            </div>
            <ChatInput socket={socket} />
        </main>
    )
}

export default Room
