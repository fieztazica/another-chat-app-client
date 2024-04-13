'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SocketEventNames } from '@/hooks/useSocket'
import useUser from '@/hooks/useUser'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

type Props = {
    socket: Socket
}

function ChatInput({ socket }: Props) {
    const { data: me } = useUser()
    const [indicators, setIndicators] = useState<string[]>([])
    const filteredIndicators = indicators.filter((i) => me?.username != i)

    useEffect(() => {
        socket.on(SocketEventNames.Indicator, (data, ack) => {
            setIndicators(data)
            console.log(data)
        })
    }, [])

    function sendMessage(content: string) {
        socket.emit(SocketEventNames.SendMessage, content)
    }

    function sendIndicator() {
        socket.emit(SocketEventNames.SendIndicator)
    }

    return (
        <div className="p-2">
            <div>
                {filteredIndicators.length > 0 &&
                    `${filteredIndicators.join(', ')} ${
                        filteredIndicators.length > 1 ? 'are' : 'is'
                    } typing...`}
            </div>
            <form
                className="flex items-center space-x-2"
                onSubmit={(e) => {
                    e.preventDefault()
                    sendMessage(e.currentTarget['message'].value)
                    e.currentTarget.reset()
                }}
            >
                <div className="flex-1">
                    <Input
                        id="message"
                        type="text"
                        name="message"
                        onChange={() => sendIndicator()}
                    />
                </div>
                <Button type={'submit'}>Send</Button>
            </form>
        </div>
    )
}

export default ChatInput
