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
import Copy from '@/components/custom/copy-to-clipboard'

function Room({ room }: { room: SocketRoom }) {
    const { isConnected, socket } = useSocket(`${room.socketUrl}`)

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
                    <RoomHeader room={room} />
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

function RoomHeader({ room }: { room: SocketRoom }) {
    return (
        <div className="flex items-center justify-between border-b px-4 py-2">
            <Copy content={room.roomId} className={"font-medium"}>Room ID: {room.roomId}</Copy>

            <div>Owner: {room.owner.username}</div>
        </div>
    )
}
