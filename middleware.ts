import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface UserI {
    id: string;
}

export async function middleware(req: NextRequest) { 
    const requestPage = req.nextUrl.pathname;
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const user = session?.user as UserI | undefined;
    const isAuthenticated = user?.id && user.id !== ''; 

    // console.log('isAuthenticated:', isAuthenticated);

    if (isAuthenticated) {
        // verificaciones si estoy autenticado
        if (requestPage === '/login' ) return NextResponse.redirect(new URL(`/`, req.url));

    } else {


        if (requestPage === '/login' ) return NextResponse.next();
        return NextResponse.redirect(new URL(`/login`, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
    ]
};