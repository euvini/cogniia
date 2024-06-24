import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    const signURL = new URL('/login', request.url)
    const homeURL = new URL('/', request.url)

    const unAuthPaths = [
        '/login',
        '/recovery',
        '/register'
    ]

    if (!token) {

        if (unAuthPaths.find(v => v === request.nextUrl.pathname)) return NextResponse.next()

        return NextResponse.redirect(signURL)
    }

    if (request.nextUrl.pathname === '/') return NextResponse.next()

    if (token && unAuthPaths.find(v => v === request.nextUrl.pathname)) return NextResponse.redirect(homeURL);

}

export const config = {
    matcher: [
        '/',
        '/home',
        '/login',
        '/recovery',
        '/profile',
        '/register',
        '/changepassword',
        '/privacy-terms',
        '/service-terms',
        '/contact'
    ]
}
