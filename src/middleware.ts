import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest){
    const {pathname} = request.nextUrl;

    const publicRoutes = ['/login', '/']

    if(publicRoutes.includes(pathname)){
        return NextResponse.next();
    }

    const token = request.cookies.get('auth-token')?.value;
    const userRole = request.cookies.get('user-role')?.value;

if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

if(pathname.startsWith('/admin') && userRole !== 'admin'){
    const accessDeniedUrl = new URL('/login', request.url)
    accessDeniedUrl.searchParams.set('error', 'admin-required')
    return NextResponse.redirect(accessDeniedUrl)
}
}

