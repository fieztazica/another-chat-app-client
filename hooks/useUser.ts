'use client'

import { cookies } from 'next/headers'
import React, { useEffect, useState } from 'react'

function useUser() {
    const token = cookies().get('TOKEN')
    const [user, setUser] = useState<Nullable<User>>(null)

    useEffect(() => {
        return () => {
            setUser(null)
        }
    }, [])

    return { user }
}

export default useUser
