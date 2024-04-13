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
    const [presences, setPresences] = useState<User[]>([])
    useEffect(() => {
        socket.on(SocketEventNames.Presence, (data, ack) => {
            setPresences(data)
        })
    }, [socket])

    return (
        <>
            <h4 className="text-lg font-semibold px-2">Current users</h4>
            <ul>
                {presences.map((p) => {
                    return (
                        <li key={`presence_${p._id}`} className='hover:bg-slate-100 py-1 px-2'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span>
                                            {p.username}
                                            {p._id == room.owner._id && (
                                                <Badge
                                                    variant={'outline'}
                                                    className="ml-2"
                                                >
                                                    Owner
                                                </Badge>
                                            )}
                                            {p._id == me?._id && (
                                                <Badge
                                                    variant={'outline'}
                                                    className="ml-2"
                                                >
                                                    Me
                                                </Badge>
                                            )}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            joined{' '}
                                            {dayjs(p.createdAt).fromNow()}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Presences
