import React, { useState } from 'react';
import LoadingButton from '@/components/custom/LoadingButton'
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

import useUpdateRoom from '@/hooks/useEditRoom';
import useMyRooms from '@/hooks/useMyRooms';

interface UpdateRoomButtonProps {
    roomId: string;
    initialRoomName: string;
}

function UpdateRoomButton({ roomId, initialRoomName }: UpdateRoomButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [roomName, setRoomName] = useState(initialRoomName);
    const { mutate, isPending, isError, error } = useUpdateRoom();
    const { data: rooms, isFetching, refetch } = useMyRooms()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await mutate({ id: roomId, name: roomName });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant="secondary" onClick={() => setIsOpen(true)}>
                        Edit Room
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Edit Room</DialogTitle>
                            <DialogDescription>
                                Edit the room name.
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
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setRoomName(e.target.value)}
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
                            {isError && <div>Error: {error.message}</div>}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default UpdateRoomButton;
