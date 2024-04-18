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
            <h4 className="p-2 scroll-m-20 text-xl font-semibold tracking-tight">
                {room.name}
            </h4>
            <Separator className="mb-2" />
            <Presences room={room} socket={socket} />
        </div>
    )
}

export default RoomSettings
