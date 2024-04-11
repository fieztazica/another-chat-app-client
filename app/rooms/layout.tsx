import LogoutButton from '@/components/auth/logout'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import React, { PropsWithChildren } from 'react'

function RoomLayout({ children }: PropsWithChildren) {
    return (
        <ResizablePanelGroup className="min-h-dvh" direction="horizontal">
            <ResizablePanel defaultSize={25}>
                <LogoutButton />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default RoomLayout
