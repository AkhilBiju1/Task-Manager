import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index"; // Importing from db/index
import { tasks } from "@/db/schema"; // Adjust based on your schema
import { and, eq, gt } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const today = new Date();

        // Query to get 2 upcoming tasks with pending status
        const upcomingTasks = await db
            .select()
            .from(tasks)
            .where(and(eq(tasks.status, "pending"), gt(tasks.due_date, today)))
            .orderBy(tasks.due_date) 
            .limit(2);

        return NextResponse.json(upcomingTasks);
    } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}
