import { IoMdAddCircleOutline } from "react-icons/io";
import TasksTable from "./allTaskTable";
export default function AllTask() {
    return (
        <section className=" md:col-span-9 col-span-full lg:col-span-10 lg:row-span-full">
            <div className=" bg-blue-50 lg:h-screen grid grid-cols-1 lg:gap-4 lg:grid-rows-12 p-4">
                <div className="  lg:row-span-1 col-span-1 mt-2 lg:p-2 my-2 flex justify-between">
                    <h1 className="text-2xl font-semibold">Tasks</h1>
                    <a href="tasks/add" className="text-blue-700  hover:text-blue-600 rounded-full text-3xl">
                        <IoMdAddCircleOutline />
                    </a>
                </div>
                <div className="col-span-1  lg:row-span-11 rounded-lg p-2 bg-white">
                    <TasksTable />
                </div>


            </div>
        </section>
    );
}