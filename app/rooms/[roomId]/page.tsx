import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Room from './room'

type Props = {
    params: { roomId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(roomId: string) {
    const token = cookies().get('TOKEN')
    if (!token) {
        throw new Error('Unauthorized')
    }
    const url = new URL(`/api/rooms/${roomId}`, process.env.BACKEND_URL)
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const body = await res.json()
    if (!body.success) {
        throw new Error(body.data)
    }

    return body.data as Room
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await getData(params.roomId)
    return {
        title: data.name,
    }
}

async function RoomPage({ params }: Props) {
    const data = await getData(params.roomId)
    return <Room room={data} />
}

export default RoomPage
