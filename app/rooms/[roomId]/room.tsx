'use client'

import useSocket from '@/hooks/useSocket'
import ChatInput from './chatInput'
import MessagesBox from './messagesBox'
import {
    ResizablePanel,
    ResizablePanelGroup,
    ResizableHandle,
} from '@/components/ui/resizable'
import RoomSettings from './roomSettings'
import UpdateRoomButton from '../editRoomButton'

function Room({ room }: { room: Room }) {

    const { isConnected, socket } = useSocket(
        `http://localhost:5000/rooms/${room.roomId}`
    )

    if (!isConnected) {
        return (
            <main className="flex justify-center items-center h-full">
                Connecting...
            </main>
        )
    }

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={75}>
                <main className="flex flex-col shrink-0 h-full">
                    <div className="flex items-center justify-between border-b px-4 py-2">
                        <div>Room ID: {room.roomId}</div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            {room.name}
                        </h4>
                        <UpdateRoomButton roomId={room._id} initialRoomName={room.name}/>
                        <div>Owner: {room.owner.username}</div>
                    </div>
                    <div className="flex-1 h-full w-full overflow-y-auto">
                        <MessagesBox socket={socket} />
                    </div>
                    <ChatInput socket={socket} />
                </main>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
                <RoomSettings room={room} socket={socket} />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default Room
