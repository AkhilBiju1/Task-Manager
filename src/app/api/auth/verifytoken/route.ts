import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwthandlers";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body: { token?: string } = await req.json();

        if (!body.token) {
            return NextResponse.json({ success: false, message: "Token missing" }, { status: 400 });
        }

        const user = verifyToken(body.token);

        return user
            ? NextResponse.json({ success: true, name: user.uname ,id:user.id })
            : NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    } catch (error) {
        console.error("JWT verification error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
