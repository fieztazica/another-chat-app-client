'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useCreateRoom from '@/hooks/useCreateRoom'
import useRooms from '@/hooks/useRooms'
import useUser from '@/hooks/useUser'
import { Loader, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

function CreateRoomButton() {
    const {} = useUser()
    const { refetch } = useRooms()
    const {
        mutate: createRoom,
        data,
        error,
        isPending,
        isError,
        isSuccess,
    } = useCreateRoom()
    const [roomName, setRoomName] = useState('')

    useEffect(() => {
        if (data) {
            redirect(`/rooms/${data.roomId}`)
        }
    }, [data])

    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess, refetch])

    function onCreateRoom() {
        createRoom({ name: roomName })
        return false
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Plus className="mr-2 h-4 w-4" /> Create a room
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a chat room</DialogTitle>
                    <DialogDescription>
                        Start to manage your own chat room.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="funny story"
                            className="col-span-3"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onCreateRoom}>
                        {isPending ? (
                            <Loader className="ml-2 animate-spin" />
                        ) : (
                            'Create'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateRoomButton