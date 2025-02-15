import { db } from "@/db/index";
import { users } from "@/db/schema";
import { InferInsertModel, and, eq } from "drizzle-orm";

export const getUser = async (name: string) => {
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.name, name));
    return existingUser.length > 0 ? existingUser[0] : false;



}

export const createUser = async (name: string, pass: string) => {
    const newUser: InferInsertModel<typeof users> = {
        name: name,
        password: pass,
    };
    const result = await db.insert(users).values(newUser).returning();
    if (result) {
        return result
    }
    else {
        return false
    }
}

export const loginUser = async (name: string, password: string) => {
    const user = await db
        .select()
        .from(users)
        .where(and(eq(users.name, name), eq(users.password, password)));

    if (user.length > 0) return user[0]
    return false
}

