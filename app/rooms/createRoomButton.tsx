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
import useUser from '@/hooks/useUser'
import { Plus } from 'lucide-react'

function CreateRoomButton() {
    const {} = useUser()

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
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateRoomButton
