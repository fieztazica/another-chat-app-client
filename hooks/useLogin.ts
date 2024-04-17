import { signInSchema } from '@/lib/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'

function useLogin() {
    return useMutation({
        mutationFn: async (data: z.infer<typeof signInSchema>) => {
            const res = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                }),
            })
            if (!res.ok) throw new Error('Failed to login')
            const body = await res.json()
            if (!body.success) throw new Error(body.data)
            return {
                token: body.data.token as string,
                user: body.data.user as User,
            }
        },
        onSuccess(data, variables, context) {
            toast({
                title: 'Successfully logged in!',
                description: `Welcome back ${data.user.username}!`,
            })

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        },
    })
}

export default useLogin
