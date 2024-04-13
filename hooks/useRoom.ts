'use client'

import { useQuery } from '@tanstack/react-query'

function useRoom(roomId: string) {
    return useQuery<Room>({
        queryKey: [`rooms/${roomId}`],
        queryFn: async () => {
            const res = await fetch(`/api/rooms/${roomId}`).then((r) =>
                r.json()
            )
            if (res.success) return res.data
        },
    })
}

export default useRoom
