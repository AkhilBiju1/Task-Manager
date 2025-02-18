import Sidebar from "../../components/sidebar";
import AddTask from "../components/addTaskComponent";

export const metadata = {
    title: "TaskPilot Tasks"
};

export default function Tasks() {
    return (
        <div className="w-screen h-screen bg-blue-50  grid grid-cols-12 grid-rows-12 gap-4">

            <Sidebar />
            <AddTask/>

        </div>
    );
}