import { pgTable, serial, varchar, char, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
});

// Categories Table
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).unique().notNull(),
});

// Projects Table
export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 1000 }), // Optional
});

// Tasks Table
export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    project_id: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    category_id: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 1000 }), // Optional
    status: varchar('status', { length: 50 }).default('pending'), // 'pending', 'in progress', 'completed', 'overdue'
    due_date: timestamp('due_date'),
    priority: char('priority', { length: 4 }).default('low'), // 'high' 'low'
    created_at: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    projects: many(projects),
    tasks: many(tasks),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
    tasks: many(tasks),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    user: one(users, { fields: [projects.user_id], references: [users.id] }),
    tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
    user: one(users, { fields: [tasks.user_id], references: [users.id] }),
    project: one(projects, { fields: [tasks.project_id], references: [projects.id] }),
    category: one(categories, { fields: [tasks.category_id], references: [categories.id] }),
}));
