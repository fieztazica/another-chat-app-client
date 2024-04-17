'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SocketEventNames } from '@/hooks/useSocket'
import useUser from '@/hooks/useUser'
import { type FormEvent, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

type Props = {
    socket: Socket
}

function ChatInput({ socket }: Props) {
    const { data: me } = useUser()
    const [content, setContent] = useState('')
    const [indicators, setIndicators] = useState<string[]>([])
    const filteredIndicators = indicators.filter((i) => me?.username != i)

    function sendMessage(content: string) {
        socket.emit(SocketEventNames.SendMessage, content)
    }

    function sendIndicator() {
        socket.emit(SocketEventNames.SendIndicator)
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        sendMessage(e.currentTarget['message'].value)
        e.currentTarget.reset()
    }

    useEffect(() => {
        socket.on(SocketEventNames.Indicator, (data, ack) => {
            setIndicators(data)
            console.log(data)
        })
    }, [])

    useEffect(() => {
        // https://stackoverflow.com/a/60247456/14660191
        const timeout = setTimeout(() => sendIndicator(), 500)
        return () => clearTimeout(timeout)
    }, [content])

    return (
        <div className="p-4">
            <div>
                {filteredIndicators.length > 0 && (
                    <span className="text-muted-background italic animate-pulse">
                        {`${filteredIndicators.join(', ')} ${
                            filteredIndicators.length > 1 ? 'are' : 'is'
                        } typing...`}
                    </span>
                )}
            </div>
            <form className="flex items-center space-x-2" onSubmit={onSubmit}>
                <div className="flex-1">
                    <Input
                        id="message"
                        type="text"
                        name="message"
                        placeholder="What a beautiful day..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <Button type={'submit'}>Send</Button>
            </form>
        </div>
    )
}

export default ChatInput
