'use client'

import { Badge } from '@/components/ui/badge'
import { SocketEventNames } from '@/hooks/useSocket'
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

type Props = {
    socket: Socket
}

function MessagesBox({ socket }: Props) {
    const [messages, setMessages] = useState<Message[]>([])
    const lastMessageRef = useRef(null)

    useEffect(() => {
        socket.on(SocketEventNames.Messages, (data, ack) => {
            console.log(data)
            setMessages((state) => [...state, data])
        })

        socket.on(SocketEventNames.Connected, (data, ack) => {
            setMessages(new Array(...data.last100Messages))
        })
    }, [socket])

    useEffect(() => {
        if (lastMessageRef && lastMessageRef.current) {
            //@ts-ignore
            lastMessageRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'end',
                inline: 'end'
            })
        }
    }, [messages])

    return (
        <ul>
            {messages.length > 0 &&
                messages.map((m, i, a) => {
                    return (
                        <li
                            ref={i == a.length - 1 ? lastMessageRef : undefined}
                            key={`message_${m?._id || i}`}
                        >
                            <div className="hover:bg-slate-200 px-2 py-1">
                                <div className="font-semibold text-muted-foreground">
                                    {m.author?.username || 'ACA Bot'}
                                    {!m.author && (
                                        <span className="ml-2">
                                            <Badge>System</Badge>
                                        </span>
                                    )}
                                </div>
                                <p>{m.content}</p>
                            </div>
                        </li>
                    )
                })}
        </ul>
    )
}

export default MessagesBox
