"use client";
import { useState } from "react";
import  React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { categories } from "@/db/schema";
import { index } from "drizzle-orm/mysql-core";

export default function AddTaskForm() {
    const fetchCategoryAndProject = async () => {
        try {
            const {data} = await axios.get("/api/allcategoryandproject");
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }
    }
    const CategoryandProjectQuery=useQuery({queryKey: ['CategoryAndProject'],queryFn:fetchCategoryAndProject})
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category_id: "",
        project_id: "",
        due_date: "",
        priority: "low",
    });
    
    const addUser = async () => {
        try {
       
        
        
            const res = await axios.post(
                '/api/tasks/add',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return (res.data.message)
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }

    }

    const { mutate, isError, error, isPending ,isSuccess, data} = useMutation({
        mutationFn: addUser,
        onSuccess: () => setFormData({
            title: "",
            description: "",
            category_id: "",
            project_id: "",
            due_date: "",
            priority: "low",
        }),
        
        retry: 1,
        retryDelay: 3000
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="title">Task Title</label>
            <input
                type="text"
                name="title"
                placeholder="Task Title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            
            <label htmlFor="description">Task Description</label>
            <textarea
                name="description"
                placeholder="Task Description (Optional)"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <label htmlFor="category_id">Category</label>
            <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >   
                <option value="" disabled>Select Category</option>
                {CategoryandProjectQuery.data?.categories.map((category: { id: string, name: string }, index: number) => (

                    <option key={index} value={category.id}>{category.name}</option>
                ))}
               
                
            </select>
            <label htmlFor="project_id">Project</label>
            <select
                name="project_id"
                required
                value={formData.project_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >   
                <option value="" disabled>Select Project</option>
                {CategoryandProjectQuery.data?.projects.map((project: { id: string, name: string},index:number) => (

                    <option key={index} value={project.id}>{project.name}</option>
                ))
 }           
            </select>
            <label htmlFor="due_date">Due Date</label>
            <input
                type="date"
                name="due_date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.due_date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <label htmlFor="priority">Priority</label>
            <select
                name="priority"
                required
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                <option value="high">High</option>
                <option value="low">Low</option>
            </select>
            <p className="text-xs text-green-600">{isSuccess ? data : ''}</p>
            <p className="text-xs text-red-600">{isError ? error.message : ''}</p>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition shadow-md">
                {isPending ? "Adding..." : "Add Task"}
            </button>

        </form>
    );
}
