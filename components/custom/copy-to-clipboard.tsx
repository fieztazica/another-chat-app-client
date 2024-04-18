'use client'

import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'
import { toast } from '../ui/use-toast'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { cn } from '@/lib/utils'

function Copy({
    content,
    children,
    className,
    ...props
}: { content: string } & PropsWithChildren &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    function onClickHandler() {
        navigator.clipboard.writeText(content)

        toast({
            title: 'Success',
            description: (
                <span>
                    Copied <span className="font-semibold">{content}</span> to
                    your clipboard!
                </span>
            ),
        })
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <div
                    className={cn('hover:cursor-pointer', className)}
                    onClick={(e) => onClickHandler()}
                    {...props}
                >
                    {children}
                </div>
            </TooltipTrigger>
            <TooltipContent>Click to copy</TooltipContent>
        </Tooltip>
    )
}

export default Copy
