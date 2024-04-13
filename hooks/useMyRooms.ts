'use client'

import { useQuery } from '@tanstack/react-query'

function useMyRooms() {
    return useQuery<Room[]>({
        queryKey: ['my-rooms'],
        queryFn: async () => {
            const res = await fetch(`/api/rooms/@mine`).then((r) => r.json())
            if (res.success) return res.data
            return []
        },
        initialData: [],
    })
}

export default useMyRooms
