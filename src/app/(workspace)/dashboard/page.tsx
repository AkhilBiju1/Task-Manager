
import Sidebar from "../components/sidebar";
import Section from "./components/section";

export const metadata = {
    title: "TaskPilot Dashboard"
};


export default function Dashboard() {
    return (
        <div className="w-screen h-screen bg-blue-50  grid grid-cols-12 grid-rows-12 gap-4">
           
            <Sidebar />
            <Section/>
        </div>
    );
}