'use client'

import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { SocketEventNames } from '@/hooks/useSocket'
import useUser from '@/hooks/useUser'
import dayjs from '@/lib/dayjs'
import { Crown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

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
                        className="hover:bg-primary-foreground py-1 px-2"
                    >
                        <span className="flex flex-wrap items-center space-x-2">
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className="font-medium text-primary">
                                        {p.username}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>joined {dayjs(p.createdAt).fromNow()}</p>
                                </TooltipContent>
                            </Tooltip>
                            {p.online && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Currently online</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                            {p._id == room.owner._id && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Crown className="w-4 h-4 text-yellow-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Room Owner</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                            {p._id == me?._id && (
                                <Badge variant={'outline'}>Me</Badge>
                            )}
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}

export default Presences
