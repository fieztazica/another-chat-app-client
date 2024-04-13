import { useMutation } from '@tanstack/react-query'

function useCreateRoom() {
    return useMutation({
        mutationFn: async (data: { name: string }) => {
            const res = await fetch(`/api/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                }),
            })
            if (!res.ok) throw new Error('Failed to fetch data')
            const body = await res.json()
            if (!body.success) throw new Error(body.data)
            return body.data as Room
        },
    })
}

export default useCreateRoom
