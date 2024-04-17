import ReactMarkdown, { type Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { PopoverClose } from '@radix-ui/react-popover'

function Markdown({ children, ...props }: Options) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                a({ children, className, href, ...props }) {
                    return (
                        <Popover>
                            <PopoverTrigger asChild>
                                <a
                                    className={cn(
                                        'text-sky-600 italic hover:underline hover:text-sky-500 cursor-pointer',
                                        className
                                    )}
                                    {...props}
                                >
                                    {children}
                                </a>
                            </PopoverTrigger>
                            <PopoverContent className="w-fit max-w-96">
                                <div className="grid gap-2">
                                    <span className="w-full text-ellipsis overflow-hidden">
                                        {`You're about to open `}
                                        <span className="text-sky-600 font-semibold">
                                            {children}
                                        </span>
                                    </span>
                                    <div className="grid grid-cols-2 gap-2">
                                        <PopoverClose asChild>
                                            <Button variant={'secondary'}>
                                                Close
                                            </Button>
                                        </PopoverClose>
                                        <Button asChild>
                                            <a href={href} target="_blank">
                                                Open anyway
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                },
            }}
            {...props}
        >
            {children}
        </ReactMarkdown>
    )
}

export default Markdown
