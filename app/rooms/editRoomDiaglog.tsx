'use client'

import LoadingButton from '@/components/custom/LoadingButton'
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
import useUpdateRoom from '@/hooks/useEditRoom'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type EditRoomDialogProps = {
    room: Room
}

function EditRoomDialog({
    room,
    children,
    className,
    ...props
}: EditRoomDialogProps &
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >) {
    const [roomName, setRoomName] = useState(room.name)
    const { mutate, isPending } = useUpdateRoom()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await mutate({ id: room.roomId, name: roomName })
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={cn('hover:cursor-pointer', className)}
                    {...props}
                >
                    {children}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Room</DialogTitle>
                        <DialogDescription>
                            Update this room name.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                value={roomName}
                                onChange={(e: {
                                    target: {
                                        value: React.SetStateAction<string>
                                    }
                                }) => setRoomName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <LoadingButton
                            isLoading={isPending}
                            type="submit"
                            loadingHolder="Updating"
                        >
                            Update
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditRoomDialog
