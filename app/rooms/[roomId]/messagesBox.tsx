'use client'

import { Badge } from '@/components/ui/badge'
import { SocketEventNames } from '@/hooks/useSocket'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

type Props = {
    socket: Socket
}

function MessagesBox({ socket }: Props) {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        socket.on(SocketEventNames.Messages, (data, ack) => {
            console.log(data)
            setMessages((state) => [...state, data])
        })
    }, [socket])

    return (
        <div>
            <ul>
                {messages.length > 0 &&
                    messages.map((m, i) => {
                        return (
                            <li key={`message_${m?._id || i}`}>
                                <div className="hover:bg-slate-200 px-2 py-1">
                                    <div className="font-semibold text-muted-foreground">
                                        {!m.author && (
                                            <span className="mr-2">
                                                <Badge>System</Badge>
                                            </span>
                                        )}
                                        {m.author?.username || 'ACA Bot'}
                                    </div>
                                    <p>{m.content}</p>
                                </div>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default MessagesBox
