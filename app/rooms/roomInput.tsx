'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRightToLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CreateRoomButton from './createRoomButton'
import useRooms from '@/hooks/useRooms'

function RoomInput() {
    const router = useRouter()
    const [roomId, setRoomId] = useState('')
    const { refetch } = useRooms()

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                router.push(`/rooms/${roomId}`)
                e.currentTarget.reset()
                setRoomId('')
                refetch()
            }}
        >
            <div className="mt-2 flex flex-col space-y-2 pb-2 border-b w-full">
                <div className="flex items-center space-x-2">
                    <Input
                        id="roomId"
                        name="roomId"
                        placeholder="enter room id"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        className="aspect-square"
                        size="icon"
                    >
                        <ArrowRightToLine className="h-4 w-4" />
                    </Button>
                </div>
                <CreateRoomButton />
            </div>
        </form>
    )
}

export default RoomInput
