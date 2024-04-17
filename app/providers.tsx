'use client'

import React, { PropsWithChildren } from 'react'
import {
    QueryClientProvider,
    QueryClient,
    MutationCache,
} from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { TooltipProvider } from '@/components/ui/tooltip'

function Providers({ children }: PropsWithChildren) {
    const [client] = React.useState(
        new QueryClient({
            mutationCache: new MutationCache({
                onError(error, _variables, _context, mutation) {
                    if (mutation.options.onError) return

                    toast({
                        variant: 'destructive',
                        title: 'Theres an error occurred',
                        description: `${(error as any).message}`,
                    })
                },
            }),
        })
    )

    return (
        <QueryClientProvider client={client}>
            <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProvider>
    )
}

export default Providers
