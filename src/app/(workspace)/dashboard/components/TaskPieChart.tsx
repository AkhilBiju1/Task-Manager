"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"; 
import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const chartOptions: ChartOptions<"pie"> = {
    plugins: {
        title: {
            display: true,
            text: "Task Progress", // Change this to your chart name
            font: {
                size: 18, // Adjust font size
                weight: "bold",
            },
            color: "#333", // Title color
        }
    }
};

export default function TaskChartComponent() {

    const fetchStats = async () => {
        try {
            const res = await axios.get("/api/tasks/stats");
            return res.data.count;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }
       
    };
    const statsQuery = useQuery({ queryKey: ["stats"], queryFn: fetchStats, refetchInterval: 2000 });
    if (statsQuery.isLoading) return (<div className="w-full h-full grid grid-rows-9 "><h1 className="row-start-5 text-md text-center items-center ">loading</h1></div>)
    if (statsQuery.error) return (<div>
        {statsQuery.error.message + 'try again later'}
    </div>)
    if (statsQuery.isSuccess) {

        const chartData = {
            labels: ["Pending", "Completed"],
            datasets: [
                {
                    data: statsQuery.data,
                    backgroundColor: ["#FF6384", "#FFCE56"],
                }
            ]
        }
        return <Pie data={chartData} options={chartOptions} />;

    }
    
}
