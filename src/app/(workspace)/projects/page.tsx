import Sidebar from "../components/sidebar";
import ProjectSection from "./components/section";

export const metadata = {
    title: "TaskPilot Projects"
};

export default function Project() {
    return (
        <div className="w-screen lg:h-screen bg-blue-50  grid grid-cols-12 lg:grid-rows-12 lg:gap-4">

            <Sidebar />
           <ProjectSection/>
        </div>
    );
}