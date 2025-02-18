import { getAllCalenderTask, getAllTask, getTaskById } from "@/db/queryies";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id') || ""
    const calender = searchParams.get('calender') || ""

        if (calender) {
            try {
                const headersList = await headers()
                const username = headersList.get('x-user-id') || '';
                const allTask = await getAllCalenderTask(username)


                if (allTask) {
                    return NextResponse.json({ tasks: allTask }, { status: 200 })
                }
                else {
                    return NextResponse.json({ message: 'try again' }, { status: 400 })
                }
            } catch (error) {
                return NextResponse.json({ message: "Internal Server Error Try Again Later" }, { status: 500 });

            }
        }
       
        
        if (id) {
            try {
        
                const task = await getTaskById(id);

                if (!task) {
                    return NextResponse.json({ error: "Task not found" }, { status: 404 });
                }

                return NextResponse.json({ task }, { status: 200 });
            } catch (error) {
                console.error("Error fetching task:", error);
                return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
            }
        } else {
            try {
            const headersList = await headers()
            const username = headersList.get('x-user-id') || '';
            const allTask = await getAllTask(username)


            if (allTask) {
                return NextResponse.json({ tasks: allTask }, { status: 200 })
            }
            else {
                return NextResponse.json({ message: 'try again' }, { status: 400 })
            }
            } catch (error) {
                return NextResponse.json({ message: "Internal Server Error Try Again Later" }, { status: 500 });

            }
        }   
}

