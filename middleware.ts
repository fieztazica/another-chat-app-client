import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|icons|assets|audio).*)',
    ],
}

const publicPaths = ['/forgot-password', '/reset-password']

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const response = NextResponse.next()

    if (publicPaths.includes(pathname)) {
        return response
    }

    if (!request.cookies.has('TOKEN') && pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (request.cookies.has('TOKEN') && pathname === '/') {
        return NextResponse.redirect(new URL('/rooms', request.url))
    }

    return response
}
