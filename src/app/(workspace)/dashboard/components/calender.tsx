"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const TaskCalendar = () => {

    const [selectedEvent, setSelectedEvent] = useState<{
        title: string;
        description: string;
        start: string; 
    } | null>(null);
    
    const tasks = [
    { id: "1", title: "Design Homepage - Create wireframes and layout", start: "2025-02-15", description: "Create wireframes for the homepage layout and design elements." },
    { id: "2", title: "Fix Login Issue - Debugging authentication error", start: "2025-02-15", description: "Fix the login issue by debugging authentication errors." },
    { id: "3", title: "Write Blog Post - SEO optimization tips", start: "2025-02-20", description: "Write a blog post about SEO optimization strategies for better rankings." },
  ];

    const handleEventClick = (arg: any) => {
        const eventDetails = {
            title: arg.event.title,
            description: arg.event.extendedProps.description,
            start: arg.event.start,
        };
        setSelectedEvent(eventDetails); 
    };

    return (
        <div className=" mt-6">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={tasks}
                editable={false}
                selectable={false}
                eventStartEditable={false}
                
                eventClick={handleEventClick}
        
            />
            {selectedEvent && (
                <div className="mt-2">
                    <h3 className="font-bold text-md">{selectedEvent.title}</h3>
                    <p>{selectedEvent.description}</p>
                    <p><strong>Start:</strong> {selectedEvent.start?.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default TaskCalendar;
