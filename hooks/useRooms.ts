'use client'

import { useQuery } from '@tanstack/react-query'
import useUser from './useUser'

function useRooms() {
    const { data } = useUser()

    return useQuery<Room[]>({
        queryKey: ['rooms'],
        queryFn: async () => {
            const res = await fetch(`/api/rooms?owner=${data?._id}`).then((r) =>
                r.json()
            )
            if (res.success) return res.data
            return []
        },
        initialData: [],
    })
}

export default useRooms
