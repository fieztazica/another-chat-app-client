'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <main className="flex justify-center items-center h-full">
            <div className="space-y-2">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Something went wrong!
                </h2>
                <Button
                    className="w-full"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
            </div>
        </main>
    )
}
