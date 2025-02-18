
import { start } from "repl";
import { db } from "./index";
import {  categories, projects, tasks, users } from "./schema";
import { InferInsertModel, and, eq, sql } from "drizzle-orm";

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

export const addTask = async (task: { title:string, description:string, category_id:string, project_id:string, due_date:string, priority :string},userId:string) => {
    const newTask : InferInsertModel<typeof tasks> = {
        title: task.title,
        description: task.description,
        user_id: parseInt(userId),
        category_id: parseInt(task.category_id),
        project_id: parseInt(task.project_id),
        due_date: new Date(task.due_date),
        priority: task.priority,
        created_at: new Date(),
        status: "pending", 
    };
    const result = await db.insert(tasks).values(newTask).returning(); 
    return result?result:false
}

export const addProject = async (project: { title: string, description: string}, userId: string) => {
    const newProject: InferInsertModel<typeof projects> = {
        name: project.title,
        description: project.description,
        user_id: parseInt(userId), 
    };
    const result = await db.insert(projects).values(newProject).returning();
    return result ? result : false
}

export const  getAllTask = async(userId: string) => {
    const result = await db
        .select({
            id: tasks.id,
            title:tasks.title,
            description:tasks.description,
            due_date: sql`DATE(${tasks.due_date})`.as("due_date"),
            status :tasks.status,
            priority:tasks.priority,
            project: projects.name,
            category: categories.name
        })
        .from(tasks).where(eq(tasks.user_id, parseInt(userId)))
        .innerJoin(projects, eq(tasks.project_id, projects.id))
        .innerJoin(categories, eq(tasks.category_id, categories.id));
    return result?result:false
        
}
export const getAllCalenderTask = async (userId: string) => {
    const result = await db
        .select({
            id: tasks.id,
            title: tasks.title,
            description: tasks.description,
            start: sql`DATE(${tasks.due_date})`.as("due_date"),
            status: tasks.status,
            priority: tasks.priority,
            project: projects.name,
            category: categories.name
        })
        .from(tasks).where(and(eq(tasks.user_id, parseInt(userId)), eq(tasks.status, 'pending')))
        .innerJoin(projects, eq(tasks.project_id, projects.id))
        .innerJoin(categories, eq(tasks.category_id, categories.id));
    return result ? result : false

}

export const getAllProjects = async (userId: string) => {
    const result = await db
        .select()
        .from(projects).where(eq(projects.user_id, parseInt(userId)))
       
    return result ? result : false

}
export async function editTask(id: string, updates: { title: string, description: string, due_date: Date,status:string, priority: string }) {
    try {
        const result = await db.update(tasks)
            .set(updates)
            .where(eq(tasks.id, parseInt(id)))
            .returning(); 
        return result[0]; 
    } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Failed to update task");
    }
}

export const deleteTask = async (id: string) => {
    if (!id) throw new Error("Task ID is required");

    const deletedTask = await db.delete(tasks).where(eq(tasks.id, parseInt(id))).returning();

    if (!deletedTask.length) throw new Error("Task not found");

    return deletedTask[0]; 
};
export async function getTaskById(taskId: string) {
    try {
        const task = await db
            .select({
                id: tasks.id,
                title: tasks.title,
                description: tasks.description,
                due_date: sql`DATE(${tasks.due_date})`.as("due_date"),
                status: tasks.status,
                priority: tasks.priority,
                project: projects.name,
                category: categories.name
            })
            .from(tasks)
            .where(eq(tasks.id, parseInt(taskId)))
            .innerJoin(projects, eq(tasks.project_id, projects.id))
            .innerJoin(categories, eq(tasks.category_id, categories.id));
            

        return task.length ? task[0] : null;
    } catch (error) {
        console.error("Database error:", error);
        return null;
    }
}
