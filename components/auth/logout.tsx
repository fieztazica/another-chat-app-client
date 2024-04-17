'use client'

import useLogout from '@/hooks/useLogout'
import LoadingButton from '../custom/LoadingButton'
import { ButtonProps } from '../ui/button'

function LogoutButton({ ...props }: ButtonProps) {
    const { mutate, isPending, data } = useLogout()

    return (
        <LoadingButton
            isLoading={isPending}
            loadingHolder="Logging you out"
            onClick={() => {
                mutate()
            }}
            {...props}
        >
            Logout
        </LoadingButton>
    )
}

export default LogoutButton
