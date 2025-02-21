
import { headers } from "next/headers";
import Sidebar from "../components/sidebar";
import Section from "./components/section";

export const metadata = {
    title: "TaskPilot Dashboard"
};


export default async function Dashboard() {
    const headersList = await headers();
    const username = headersList.get('x-user-name') || 'Guest';
    return (
        <div className="w-screen lg:h-screen  bg-blue-50  grid grid-cols-12 md:grid-rows-12 md:gap-4">
           
            <Sidebar />
            <Section username={username} />
        </div>
    );
}