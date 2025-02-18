import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { categories, projects } from "@/db/schema";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";


export async function GET() {
    try {
        const headersList = await headers()
        const id = headersList.get('x-user-id') || '';
        
        const allCategories = await db.select().from(categories);

        
        const allProjects = await db.select().from(projects).where(eq(projects.user_id,parseInt(id)));

        return NextResponse.json(
            { categories: allCategories, projects: allProjects },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
