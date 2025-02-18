import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index"; // Importing from db/index
import { tasks } from "@/db/schema"; // Adjust based on your schema
import { and, eq, gt } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const today = new Date();

        const headersList = await headers()
        const id = headersList.get('x-user-id') || '';
        const upcomingTasks = await db
            .select()
            .from(tasks)
            .where(and(eq(tasks.status, "pending"), gt(tasks.due_date, today), eq(tasks.user_id, parseInt(id))))
            .orderBy(tasks.due_date) 
            .limit(1);

        return NextResponse.json(upcomingTasks);
    } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}
