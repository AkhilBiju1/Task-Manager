
import TaskChartComponent from "./TaskPieChart";
import CategoryChartComponent from "./TaskCategoryChart";
import TaskCalendar from "./calender";


export default function Section() {
    return (
        <section className=" col-span-10 row-span-full">
            <div className=" bg-blue-50 h-screen grid grid-cols-12 gap-4 grid-rows-12 p-4">
                <h1 className="text-2xl col-span-full row-span-1 mt-2 font-semibold ">Dashboard</h1>
                <div className="col-span-6  row-span-6 rounded-lg p-2 bg-white">
                    Upcoming Deadlines
                </div>
                <div className="col-span-6  row-span-12 rounded-lg p-2 bg-white ">
                    <TaskCalendar />
                </div>
                
                <div className="col-span-6  row-span-6 rounded-lg p-2 bg-white flex justify-between">
                    <TaskChartComponent />
                    <CategoryChartComponent />
                </div>
            </div>
        </section>
    );
}