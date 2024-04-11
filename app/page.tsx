import AuthSwitcher from '@/components/auth/auth-switcher'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
    // const token = cookies().get('TOKEN')
    // if (token) return redirect('/rooms')
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center p-24">
            <AuthSwitcher />
        </main>
    )
}
