import { editTask } from "@/db/queryies";
import { NextRequest, NextResponse } from "next/server"; 

// Function to edit task


// API Route
export async function PUT(req: NextRequest,) {
    try {
        const searchParams = req.nextUrl.searchParams
        const id =searchParams.get('id') ||""
        const body = await req.json();
        if (!body) return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
        if (body.due_date) body.due_date = new Date(body.due_date)
        const updatedTask = await editTask(id,body);
        if (!updatedTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });
        return NextResponse.json({ message: "Task updated"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
