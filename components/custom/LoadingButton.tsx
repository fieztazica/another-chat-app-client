import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
    isLoading?: boolean
    loadingHolder?: string
}

function LoadingButton({
    isLoading = false,
    loadingHolder = 'Please wait',
    children,
    ...props
}: Props & ButtonProps) {
    return (
        <Button disabled={isLoading} {...props}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingHolder}
                </>
            ) : (
                children
            )}
        </Button>
    )
}

export default LoadingButton
