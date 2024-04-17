'use client'

import { Badge } from '@/components/ui/badge'
import { SocketEventNames } from '@/hooks/useSocket'
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import dayjs from '@/lib/dayjs'
import Markdown from './Markdown'

type Props = {
    socket: Socket
}

function MessagesBox({ socket }: Props) {
    const [messages, setMessages] = useState<Message[]>([])
    const lastMessageRef = useRef(null)

    useEffect(() => {
        socket.on(SocketEventNames.Messages, (data, ack) => {
            // console.log(data)
            setMessages((state) => [...state, data])
        })

        socket.on(SocketEventNames.Connected, (data, ack) => {
            console.log(data)
            setMessages(new Array(...data.last100Messages))
        })
    }, [socket])

    useEffect(() => {
        if (lastMessageRef && lastMessageRef.current) {
            //@ts-ignore
            lastMessageRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'end',
                inline: 'end',
            })
        }
    }, [messages])

    return (
        <ul className='w-full text-clip text-wrap'>
            {messages.length > 0 ? (
                messages.map((m, i, a) => {
                    return (
                        <li
                            ref={i == a.length - 1 ? lastMessageRef : undefined}
                            key={`message_${m?._id || i}`}
                        >
                            <div className="hover:bg-slate-100 px-2 py-1">
                                <div className="flex items-end space-x-2">
                                    <div className="font-semibold text-muted-foreground">
                                        {m.author?.username || 'ACA Bot'}
                                        {!m.author && (
                                            <span className="ml-2">
                                                <Badge>System</Badge>
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {dayjs(m.updatedAt).fromNow()}
                                    </span>
                                </div>
                                <Markdown>{m.content}</Markdown>
                            </div>
                        </li>
                    )
                })
            ) : (
                <div className="hover:bg-slate-100 px-2 py-1 font-semibold text-muted-foreground flex justify-center items-center">
                    <p>
                        {'This is the beginning of this room. Start talking!'}
                    </p>
                </div>
            )}
        </ul>
    )
}

export default MessagesBox
