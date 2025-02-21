
import TaskChartComponent from "./TaskPieChart";
import PriorityChartComponent from "./TaskPriorityChart";
import TaskCalendar from "./calender";
import TaskCards from "./upcomingTask";

interface UnameProps {
    username: string;
}

export default function Section({ username }: UnameProps) {
    return (
        <section className="col-span-12 md:col-span-9 lg:col-span-10 lg:row-span-full">
            <div className=" bg-blue-50 lg:h-screen grid grid-cols-12 gap-4 lg:grid-rows-12 p-4">
                <h1 className="text-2xl col-span-full row-span-1 mt-2 font-semibold px-2  md:p-0">Welcome <span className="text-blue-700 capitalize">{username}</span>! Here's Your Dashboard</h1>
                <div className="col-span-12 lg:col-span-6  lg:row-span-6 rounded-lg p-2 bg-white">
                    <TaskCards />
                </div>
                <div className="col-span-12   lg:col-span-6 lg:row-span-12 rounded-lg p-2 bg-white ">
                    <TaskCalendar />
                </div>

                <div className="col-span-12 row-start-3 lg:col-span-6 lg:row-span-6 rounded-lg p-2 bg-white flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/2 mx-auto">
                        <TaskChartComponent />
                    </div>
                    <div className="w-full sm:w-1/2 mt-2 md:mt-0 mx-auto">
                        <PriorityChartComponent />
                    </div>
                </div>
            </div>
        </section>
    );
}