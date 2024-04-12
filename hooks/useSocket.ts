'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function useSocket(webSocketURI: string) {
    const [socket, setSocket] = useState(() =>
        io(webSocketURI, {
            withCredentials: true,
        })
    )
    const [isConnected, setIsConnected] = useState(false)
    const [transport, setTransport] = useState('N/A')

    useEffect(() => {
        if (socket.connected) {
            onConnect()
        }

        function onConnect() {
            setIsConnected(true)
            setTransport(socket.io.engine.transport.name)

            socket.io.engine.on('upgrade', (transport) => {
                setTransport(transport.name)
            })
        }

        function onDisconnect() {
            setIsConnected(false)
            setTransport('N/A')
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [socket])

    return { socket, setSocket, isConnected, transport }
}

export default useSocket

export enum SocketEventNames {
    SendMessage = 'send_message',
    Messages = 'messages',
    JoinRoom = 'join_room',
    Connected = 'connected',
    Error = 'error',
}
