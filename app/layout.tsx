import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import Providers from './providers'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: {
        template: '%s | ACA',
        default: 'Another Chat App',
    },
    description: 'Another chat app - MERN Stack',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    )
}
