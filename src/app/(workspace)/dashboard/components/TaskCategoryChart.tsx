"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"; 
import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const chartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
        {
            data: [10, 20, 30],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        }
    ]
};
const chartOptions: ChartOptions<"pie"> = {
    plugins: {
        title: {
            display: true,
            text: "Task Category Report", // Change this to your chart name
            font: {
                size: 18, // Adjust font size
                weight: "bold",
            },
            color: "#333", // Title color
        }
    }
};

export default function CategoryChartComponent() {
    return <Pie data={chartData} options={chartOptions} />;
}
