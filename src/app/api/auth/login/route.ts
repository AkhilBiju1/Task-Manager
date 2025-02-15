import { NextResponse, } from "next/server";
import {  loginUser } from "@/db/queryies";
import { createToken } from "@/lib/jwthandlers";

export async function POST(req: Request) {
    try {
        const { name, pass } = await req.json()
        if (!name || !pass) return NextResponse.json({ message: "Username and Password are required" }, { status: 400 });

        const user = await loginUser(name, pass)
        if (user) {
            const token = createToken({ id: user.id, uname: user.name, role: 'user' })
            const res = NextResponse.json({ message: "User loggedin successfully!" }, { status: 200 });

            res.headers.set(
                "Set-Cookie",
                `token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; Path=/; Max-Age=3600; SameSite=Strict`
            );

            return res
        } else  return NextResponse.json({ message: "Invalid Username and Password" }, { status: 401 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return NextResponse.json({ message: "Internal Server Error Try Again Later" }, { status: 500 });
    }
}
