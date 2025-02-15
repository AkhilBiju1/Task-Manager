import { NextRequest, NextResponse} from "next/server";
import { CustomJwtPayload, verifyToken } from "./lib/jwthandlers";
import axios from "axios";



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
        

        return data.success
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/login", req.url));

    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
       
}
export const config = {
    matcher: ["/dashboard/:path*", "/tasks/:path*", '/products/:path*', '/api/:path*','/'],
    
}