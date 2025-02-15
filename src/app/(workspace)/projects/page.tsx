import Sidebar from "../components/sidebar";
import ProjectSection from "./components/section";

export const metadata = {
    title: "TaskPilot Projects"
};

export default function Project() {
    return (
        <div className="w-screen h-screen bg-blue-50  grid grid-cols-12 grid-rows-12 gap-4">

            <Sidebar />
           <ProjectSection/>
        </div>
    );
}