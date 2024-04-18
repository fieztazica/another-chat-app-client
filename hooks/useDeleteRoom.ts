import { useMutation } from '@tanstack/react-query'

function useDeleteRoom() {
    return useMutation({
        mutationFn: async (data: {id: string}) => {
            const res = await fetch(`/api/rooms/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) throw new Error('Failed to fetch data')
            return res.json();
        },
    })
}

export default useDeleteRoom