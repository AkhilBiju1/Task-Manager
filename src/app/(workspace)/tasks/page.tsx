import Sidebar from "../components/sidebar";
import TaskSection from "./components/section";

export default function Tasks() {
    return (
        <div className="w-screen h-screen bg-blue-50  grid grid-cols-12 grid-rows-12 gap-4">

            <Sidebar />
            <TaskSection />
           
        </div>
    );
}