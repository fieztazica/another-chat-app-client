import { Separator } from '@/components/ui/separator'
import { Socket } from 'socket.io-client'
import Presences from './presences'

type Props = {
    socket: Socket
    room: Room
}

function RoomSettings({ room, socket }: Props) {
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
