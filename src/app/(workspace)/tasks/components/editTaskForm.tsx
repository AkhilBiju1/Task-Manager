"use client";
import { useEffect, useState } from "react";
import  React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default  function EditTaskForm() {
    const router = useRouter()
    const { id } =  useParams()
    const [formData, setFormData] = useState({
        id:'',
        title: "",
        status: '',
        description: "",
        due_date: "",
        priority: "low",
    });

    const fetchTasks = async () => {
       
        try {

            const res = await axios.get(`/api/tasks?id=${id}`);
            return res.data.task;
        } catch (error) {

              if (axios.isAxiosError(error) && error.response?.status == 404) {
                
                throw error.response
            } else if (axios.isAxiosError(error) && error.response) {
                  throw error.response.data
              }
            else {
                throw { message: 'Unknown error occurred' };
            }
        }
    };

    const taskFetch = useQuery({ queryKey: ["task"], queryFn: fetchTasks,retry:0,   });
    if (taskFetch.isError) {
        if ("status" in taskFetch.error && typeof taskFetch.error.status === "number") {
            if (taskFetch.error.status == 404) router.replace('/not-found')

        }
    }
    useEffect(()=>{
        if (taskFetch.status === 'success') {
            setFormData({
                id:taskFetch.data.id,
                title: taskFetch.data.title,
                status: taskFetch.data.status,
                description: taskFetch.data.description,
                due_date: taskFetch.data.due_date,
                priority: taskFetch.data.priority,
            })
        } 
    }, [taskFetch.status,taskFetch.data])
    
    const editTask = async () => {
        try {
        
            const res = await axios.put(
                `/api/tasks/edit?id=${id}`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return (res.data.message)
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                throw {message:error.response.data.message, status: error.response.status};
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }

    }

    const { mutate, isError, error, isPending ,isSuccess, data} = useMutation({
        mutationFn: editTask,
        onSuccess: () => router.push('/tasks'),
        
        retry: 1,
        retryDelay: 3000
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        console.log(e.target.value);
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };
    if(taskFetch.isPending) return <h1 className="text-center">Please Wait</h1>
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="title"
                placeholder="Task Title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <textarea
                name="description"
                placeholder="Task Description (Optional)"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
           
            <input
                type="date"
                name="due_date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.due_date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <select
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                
                <option value="pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <select
                name="priority"
                required
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >   
               
                <option value="low">Low</option>
                <option value="high">High</option>
            </select>
            <p className="text-xs text-green-600">{isSuccess ? data : ''}</p>
            <p className="text-xs text-red-600">{isError ? error.message : ''}</p>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition shadow-md">
                {isPending ? "Editing..." : "Edit Task"}
            </button>

        </form>
    );
}
