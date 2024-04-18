'use client'

import { Star, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

function GitHubStarBox() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            {isOpen && (
                <div className="w-full flex items-center justify-center py-1 relative bg-primary text-primary-foreground">
                    <a
                        target="_blank"
                        href="https://github.com/fieztazica/another-chat-app-client"
                        className="underline flex items-center hover:font-semibold"
                    >
                        <Star className="w-4 h-4 mr-2" /> Star us on GitHub
                    </a>
                    <div className="justify-self-end absolute right-0 p-1 mr-2">
                        <Button
                            className="w-6 h-6"
                            variant={'ghost'}
                            size={'icon'}
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default GitHubStarBox
