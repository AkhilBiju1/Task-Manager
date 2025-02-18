import { NextResponse } from "next/server";
import { db } from "@/db/index"; // Your Drizzle database instance
import { tasks } from "@/db/schema"; // Your Drizzle schema
import { eq, count } from "drizzle-orm";

export async function GET() {
    try {
        const highPriorityCount = await db
            .select({ count: count() })
            .from(tasks)
            .where(eq(tasks.priority, "high"));

        const lowPriorityCount = await db
            .select({ count: count() })
            .from(tasks)
            .where(eq(tasks.priority, "low"));

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
