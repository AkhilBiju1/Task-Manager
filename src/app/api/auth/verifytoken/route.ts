import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwthandlers";

export async function POST(req: Request) {
    try {
        const { token } = await req.json(); 
        if (!token) {
            return NextResponse.json({ success: false, message: "Token missing" }, { status: 400 });
        }

        const payload = verifyToken(token);
        
        
        return payload
            ? NextResponse.json({ success: true, userId: payload.id })
            : NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 }).cookies.delete('token')

    } catch (error) {
        console.error("JWT verification error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
