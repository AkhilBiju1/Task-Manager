import { NextRequest, NextResponse } from "next/server";




export async function middleware(req: NextRequest) {

    const token = req.cookies.get('token')?.value
    if (req.nextUrl.pathname === '/' && token) return NextResponse.redirect(new URL("/dashboard", req.url));

    if (req.nextUrl.pathname === '/' && !token) return NextResponse.next()

    if (req.nextUrl.pathname.startsWith("/api/auth/")) return NextResponse.next();

    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
        const verifyResponse = await fetch(`${req.nextUrl.origin}/api/auth/verifytoken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await verifyResponse.json();


        if (data.success) {
            const requestHeaders = new Headers(req.headers);
            requestHeaders.set('X-User-Name', (data as any).name);
            requestHeaders.set('X-User-id', (data as any).id);
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } else {
            NextResponse.redirect(new URL("/login", req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
  

}
export const config = {
    matcher: ["/dashboard/:path*", "/tasks/:path*", '/products/:path*', '/api/:path*', '/'],

}
