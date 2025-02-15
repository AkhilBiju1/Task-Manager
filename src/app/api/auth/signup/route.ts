import { NextResponse, } from "next/server";
import { getUser, createUser } from "@/db/queryies";
import { createToken } from "@/lib/jwthandlers";

export async function POST(req: Request) {
    try {


        const { name, pass } = await req.json()
        

        if (!name || !pass) return NextResponse.json({ message: "Username and Password are required" }, { status: 400 });
        if (await getUser(name)) return NextResponse.json({ message: "User already exists" }, { status: 409 });

        const result = await createUser(name, pass)
        if (result) {

            const token = createToken({ id: result[0].id, uname: result[0].name, role: 'user' })
            const res = NextResponse.json({ message: "User added successfully!"}, { status: 201 });

            res.headers.set(
                "Set-Cookie",
                `token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; Path=/; Max-Age=3600; SameSite=Strict`
            );

            return res
        }

    } catch (error) {
        console.error("Error inserting user:", error);
        return NextResponse.json({ message: "Internal Server Error Try Again Later" }, { status: 500 });
    }
}
