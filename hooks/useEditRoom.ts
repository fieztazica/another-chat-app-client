import { useMutation } from '@tanstack/react-query';

function useUpdateRoom() {
    return useMutation({
        mutationFn: async (data: { id: string, name: string }) => {
            const { id, ...roomData } = data;
            const res = await fetch(`/api/rooms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData),
            });
            if (!res.ok) throw new Error('Failed to update room');
            const body = await res.json();
            if (!body.success) throw new Error(body.data);
            return body.data as Room;
        },
    });
}

export default useUpdateRoom;
