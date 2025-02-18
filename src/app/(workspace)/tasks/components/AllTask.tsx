import { IoMdAddCircleOutline } from "react-icons/io";
import TasksTable from "./allTaskTable";
export default function AllTask() {
    return (
        <section className=" col-span-10 row-span-full">
            <div className=" bg-blue-50 h-screen grid grid-cols-1 gap-4 grid-rows-12 p-4">
                <div className="  row-span-1 mt-2 p-2 flex justify-between">
                    <h1 className="text-2xl font-semibold">Tasks</h1>
                    <a href="tasks/add" className="text-blue-700  hover:text-blue-600 rounded-full text-3xl">
                        <IoMdAddCircleOutline />
                    </a>
                </div>
                <div className="col-span-2  row-span-11 rounded-lg p-2 bg-white">
                    <TasksTable />
                </div>


            </div>
        </section>
    );
}