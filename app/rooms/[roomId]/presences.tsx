'use client'

import React, { useEffect, useState } from 'react'
import { SocketEventNames } from '@/hooks/useSocket'
import { Socket } from 'socket.io-client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import dayjs from '@/lib/dayjs'
import { Badge } from '@/components/ui/badge'
import useUser from '@/hooks/useUser'

type Props = {
    socket: Socket
    room: Room
}

function Presences({ socket, room }: Props) {
    const { data: me } = useUser()
    const [presences, setPresences] = useState<Member[]>([])
    useEffect(() => {
        socket.on(SocketEventNames.Presence, (data, ack) => {
            console.log(data)
            setPresences(data)
        })
    }, [socket])

    return (
        <ul>
            {presences.map((p) => {
                return (
                    <li
                        key={`presence_${p._id}`}
                        className="hover:bg-slate-100 py-1 px-2"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className="flex flex-wrap items-center space-x-2">
                                        <span>{p.username}</span>
                                        {p.online && (
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                        )}
                                        {p._id == room.owner._id && (
                                            <Badge variant={'outline'}>
                                                Owner
                                            </Badge>
                                        )}
                                        {p._id == me?._id && (
                                            <Badge variant={'outline'}>
                                                Me
                                            </Badge>
                                        )}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>joined {dayjs(p.createdAt).fromNow()}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                )
            })}
        </ul>
    )
}

export default Presences
