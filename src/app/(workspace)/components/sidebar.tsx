import { FaUser } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";


export default function Sidebar() {
    return (
        <section className="bg-white col-span-2   row-span-full m-4 me-0 rounded-lg"> 
            <div className="container  p-3 flex flex-col">
                <div className="flex"> <GoTasklist className="block text-3xl text-blue-800 " /><h1 className="text-xl  ">TaskPilot</h1></div>
            </div>
            <ul className="container h-4/6 p-3 mt-4  ">

                <li className="mt-3"><a href="/dashboard">Dashboard</a></li>
                <li className="mt-3"><a href="/tasks">Tasks</a></li>
                <li className="mt-3 "><a href="/projects">Projects</a></li>
                <li className=" mt-3 "><a href="#">Logout</a></li>
            </ul>
            
        </section>
    );
}