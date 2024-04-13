'use client'

import { useQuery } from '@tanstack/react-query'

function useRooms(query: string = '') {
    return useQuery<Room[]>({
        queryKey: ['rooms'],
        queryFn: async () => {
            if (!query) return []
            const res = await fetch(`/api/rooms?${query}`).then((r) => r.json())
            if (res.success) return res.data
            return []
        },
        initialData: [],
    })
}

export default useRooms
