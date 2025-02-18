
import TaskChartComponent from "./TaskPieChart";
import PriorityChartComponent from "./TaskPriorityChart";
import TaskCalendar from "./calender";
import TaskCards from "./upcomingTask";

interface UnameProps {
    username: string;
}

export default function Section({ username }: UnameProps) {
    return (
        <section className=" col-span-10 row-span-full">
            <div className=" bg-blue-50 h-screen grid grid-cols-12 gap-4 grid-rows-12 p-4">
                <h1 className="text-2xl col-span-full row-span-1 mt-2 font-semibold ">Welcome {username}! Here's Your Dashboard</h1>
                <div className="col-span-6  row-span-6 rounded-lg p-2 bg-white">
                    <TaskCards/>
                </div>
                <div className="col-span-6  row-span-12 rounded-lg p-2 bg-white ">
                    <TaskCalendar />
                </div>
                
                <div className="col-span-6  row-span-6 rounded-lg p-2 bg-white flex justify-between">
                    <TaskChartComponent />
                    <PriorityChartComponent />
                </div>
            </div>
        </section>
    );
}