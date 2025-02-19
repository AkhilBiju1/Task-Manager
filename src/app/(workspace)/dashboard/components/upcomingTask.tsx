'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const upcomingTasksQueryKey: ["upcomingTasks"] = ["upcomingTasks"]; 

export default function TaskCards() {
    const queryClient = useQueryClient();
    const fetchStats = async () => {
        try {
            const res = await axios.get("/api/tasks/upcoming");
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }
       
    };
    const upcomingTaskQuery = useQuery({ queryKey: upcomingTasksQueryKey, queryFn: fetchStats });
    
    //button action
    const updateTask = async (id:string) => {
        try {

            const res = await axios.put(
                `/api/tasks/edit?id=${id}`,
                {status: 'Completed'},
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
    };

    const taskUpdateMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => queryClient.invalidateQueries(upcomingTaskQuery),
        retry: 1,
        retryDelay: 3000
})
    
    const handleButton = (id:string) => {
        taskUpdateMutation.mutate(id)
    }
    if (upcomingTaskQuery.isLoading) return (<div className="w-full h-full grid grid-rows-9 "><h1 className="row-start-5 text-md text-center items-center ">loading</h1></div>)
    if (upcomingTaskQuery.error) return (<div>
        {upcomingTaskQuery.error.message + 'try again later'}
    </div>)
    if (upcomingTaskQuery.isSuccess) return (
        <div className=" items-center p-2   h-full w-full">
            <h1 className="text-2xl font-bold mb-1">Upcoming Tasks</h1>

            {upcomingTaskQuery.data.length > 0 ?
                
                <div className="w-full h-full  gap-4">
                    {upcomingTaskQuery.data.map((task: { id: string, title: string, description: string, status: string, priority: string, due_date: string }, index: number) => (
                        <div key={index} className="bg-white  shadow-md rounded-2xl p-6 w-full">
                            <h2 className="text-xl font-semibold uppercase">{task.title}</h2>
                            <p className="text-gray-800 mt-2 capitalize">{task.description}</p>
                            <div className="mt-2 flex justify-between" >
                                <p className="text-gray-600 mt-2">Status: </p>
                                <p className={task.status == 'pending' ? "text-red-600 mt-2 capitalize" : "text-green-600 mt-2 capitalize"}>{task.status} </p>
                            </div>
                            <div className="mt-2 flex justify-between" >
                                <p className="text-gray-600 mt-2">Priority: </p>
                                <p className={task.priority == 'high' ? "text-red-600 mt-2" : "text-green-600 mt-2 capitalize"}>{task.priority}</p>
                            </div>
                            <div className="flex mt-2 justify-between">
                                <p className="text-gray-600 mt-2">Due Date: </p>
                                <p className="text-red-600 mt-2">{new Date(task.due_date).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",

                                })}</p>
                            </div>
                            {
                                task.status == 'pending' ?
                                    <div className={`flex mt-2 justify-between`}>
                                        <button disabled={taskUpdateMutation.isPending ? true : false} onClick={() => handleButton(task.id)} className="border-green-700 border-2 p-2 text-green-700 hover:text-white rounded-md hover:bg-green-700">Mark As Complete</button>

                                    </div> : ''
                            }
                        </div>
                    ))}
                </div>
                : <h1 className="text-gray-600 text-center text-xl m-20">No Upcoming Task Found</h1>}
        </div>
    );
};

 
