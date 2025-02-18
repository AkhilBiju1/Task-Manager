"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"; 
import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);



export default function PriorityChartComponent() {

    
    const chartOptions: ChartOptions<"pie"> = {
        plugins: {
            title: {
                display: true,
                text: "Task Priority Report", // Change this to your chart name
                font: {
                    size: 18, // Adjust font size
                    weight: "bold",
                },
                color: "#333", // Title color
            }
        }
    };

    
    const fetchCount = async () => {
        const res = await axios.get("/api/tasks/count");
        return res.data.count;
    };
    const coutQuery = useQuery({ queryKey: ["count"], queryFn: fetchCount, refetchInterval: 2000 });
    if (coutQuery.isLoading) return (<div className="w-full h-full grid grid-rows-9 "><h1 className="row-start-5 text-md text-center items-center ">loading</h1></div>)
    if (coutQuery.error) return (<div>
        {coutQuery.error.message + 'try again later'}
    </div>)
    if (coutQuery.isSuccess) {
            
        const chartData = {
            labels: ["High", "Low"],
            datasets: [
                {
                    data: coutQuery.data,
                    backgroundColor: ["#FF6384", "#FFCE56"],
                }
            ]
        }
        return <Pie data={chartData} options={chartOptions} />;

    }
    }
