"use client";
import { useState } from "react";
import  React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function AddProjectForm() {

    const [formData, setFormData] = useState({
        title: "",
        description: ""
       
    });
    const addUser = async () => {
        try {
            const res = await axios.post(
                '/api/projects/add',
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

    const { mutate, isError, error, isPending, isSuccess, data } = useMutation({
        mutationFn: addUser,
        onSuccess: () => setFormData({
            title: "",
            description: ""}),
        
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
            <input
                type="text"
                name="title"
                placeholder="Project Title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <textarea
                name="description"
                placeholder="Project Description (Optional)"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <p className="text-xs text-green-600">{isSuccess ? data : ''}</p>
            <p className="text-xs text-red-600">{isError ? error.message : ''}</p>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition shadow-md">
                {isPending ? "Adding..." : "Add Project"}
            </button>

        </form>
    );
}
