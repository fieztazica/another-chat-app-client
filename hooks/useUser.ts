'use client'

import { useQuery } from '@tanstack/react-query'

function useUser() {
    return useQuery<User>({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('/api/users/@me').then((r) => r.json())
            if (res.success) return res.data
        },
    })
}

export default useUser
