import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import React, { PropsWithChildren } from 'react'
import RoomList from './roomList'
import UserBox from './userBox'
import RoomInput from './roomInput'
import GitHubStarBox from '@/components/custom/github-star'

function RoomLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-dvh max-h-dvh">
            <GitHubStarBox />
            <ResizablePanelGroup
                className="flex-1 border"
                direction="horizontal"
            >
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
        </div>
    )
}

export default RoomLayout
