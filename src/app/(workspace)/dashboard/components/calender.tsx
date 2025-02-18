"use client";
import {  useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const TaskCalendar = () => {
    
    
    const [selectedEvent, setSelectedEvent] = useState<{
        title: string;
        description: string;
        start: string; 
    } | null>(null);
    const fetchTasks = async () => {
        try {
            const res = await axios.get("/api/tasks?calender=1");
            return res.data.tasks;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }
       
    };
    const { data, isLoading, error, isSuccess, } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks, refetchInterval: 2000 });
    
    const handleEventClick = (arg: any) => {
        const eventDetails = {
            title: arg.event.title,
            description: arg.event.extendedProps.description,
            start: arg.event.start,
        };
        setSelectedEvent(eventDetails); 
    };
    
    
    if (isLoading) return (<div className="w-full h-full grid grid-rows-9 "><h1 className="row-start-5 text-md text-center items-center ">loading</h1></div>)
    if (error) return (<div>
        {error.message + 'try again later'}
    </div>)
    return (
        <div className=" mt-6">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events = {data}
                editable={false}
                selectable={false}
                eventStartEditable={false}
                
                eventClick={handleEventClick}
        
            />
            {selectedEvent && (
                <div className="mt-2 p-3 px-4">
                    <h3 className="font-bold text-md">{selectedEvent.title}</h3>
                    <p>{selectedEvent.description}</p>
                    <p><strong>Due date</strong> {new Date(selectedEvent.start).toLocaleString("en-GB", {
                        
                        day: "2-digit",   
                        month: "long",    
                        year: "numeric",  
                        
                    })}</p>
                </div>
            )}
        </div>
    );
};

export default TaskCalendar;
