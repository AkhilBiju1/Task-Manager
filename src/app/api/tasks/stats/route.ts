import { NextResponse } from "next/server";
import { db } from "@/db/index"; // Your Drizzle database instance
import { tasks } from "@/db/schema"; // Your Drizzle schema
import { eq, count } from "drizzle-orm";

export async function GET() {
    try {
        const pending = await db
            .select({ count: count() })
            .from(tasks)
            .where(eq(tasks.status, "pending"));

        const completed = await db
            .select({ count: count() })
            .from(tasks)
            .where(eq(tasks.status, "Completed"));

        return NextResponse.json({
            count: [pending[0].count, completed[0].count]
        });
    } catch (error) {
        console.error("Error fetching task counts:", error);
        return NextResponse.json(
            { error: "Failed to retrieve task counts" },
            { status: 500 }
        );
    }
}
