import { getAllProjects } from "@/db/queryies";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const headersList = await headers()
        const username = headersList.get('x-user-id') || '';
        const allProjects = await getAllProjects(username)


        if (allProjects) {
            return NextResponse.json({ tasks: allProjects }, { status: 200 })
        }
        else {
            return NextResponse.json({ message: 'try again' }, { status: 400 })
        }


    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error Try Again Later" }, { status: 500 });

    }
}
