import { NextResponse } from "next/server";
import { db } from "@/db/index"; // Your Drizzle database instance
import { tasks } from "@/db/schema"; // Your Drizzle schema
import { eq, count, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET() {
    const headersList = await headers()
    const id = headersList.get('x-user-id') || '';
    try {
        const highPriorityCount = await db
            .select({ count: count() })
            .from(tasks)
            .where(and(eq(tasks.priority, "high"), eq(tasks.user_id, parseInt(id))));

        const lowPriorityCount = await db
            .select({ count: count() })
            .from(tasks)
            .where(and(eq(tasks.priority, "low"), eq(tasks.user_id, parseInt(id))))

        return NextResponse.json({
            count: [highPriorityCount[0].count,lowPriorityCount[0].count]
        });
    } catch (error) {
        console.error("Error fetching task counts:", error);
        return NextResponse.json(
            { error: "Failed to retrieve task counts" },
            { status: 500 }
        );
    }
}
