import Sidebar from "../components/sidebar";
import AllTask from "./components/AllTask";

export const metadata = {
    title: "TaskPilot Tasks"
};

export default function Tasks() {
    return (
        <div className="w-screen lg-h-screen bg-blue-50  grid grid-cols-12 lg:grid-rows-12 lg:gap-4">

            <Sidebar />
            <AllTask />
           
        </div>
    );
}