import { NextResponse, } from "next/server";
import { addProject } from "../../../../db/queryies";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const headersList = await headers();
        const username = headersList.get('x-user-id') || '';
        const result = await addProject(body, username)
        if (result) return NextResponse.json({ message: "Project added successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return NextResponse.json({ message: "Internal Server Error Try Again Later" }, { status: 500 });
    }
}
