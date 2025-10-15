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


if(pathname.startsWith('/user') && !userRole){
    const accessDeniedUrl = new URL('login', request.url)
    accessDeniedUrl.searchParams.set('error','login-required');
    return NextResponse.redirect(accessDeniedUrl)

}


const response = NextResponse.next();
response.headers.set('x-user-role',userRole || 'guest');
response.headers.set('x-auth-token', token);+




export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}

}

