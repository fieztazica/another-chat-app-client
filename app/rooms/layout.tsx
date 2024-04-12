import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import React, { PropsWithChildren } from 'react'
import RoomList from './roomList'
import UserBox from './userBox'
import RoomInput from './roomInput'

function RoomLayout({ children }: PropsWithChildren) {
    return (
        <ResizablePanelGroup className="min-h-dvh" direction="horizontal">
            <ResizablePanel defaultSize={25}>
                <div className="flex flex-col p-2">
                    <UserBox />
                    <RoomInput />
                    <RoomList />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default RoomLayout
