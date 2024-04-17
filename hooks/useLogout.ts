import { toast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'

function useLogout() {
    return useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) throw new Error('Failed to logout')
            const body = await res.json()
            if (!body.success) throw new Error(body.data)
            return true
        },
        onSuccess(data, variables, context) {
            toast({
                title: 'See yah!',
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        },
    })
}

export default useLogout
