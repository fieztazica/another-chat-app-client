import React from 'react'

function Room({ params }: { params: { roomId: string } }) {
    return <main>Room {params.roomId}</main>
}

export default Room
