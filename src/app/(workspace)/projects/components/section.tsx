import { IoMdAddCircleOutline } from "react-icons/io";
import ProjectTable from "./AllProjectTable";


export default function ProjectSection() {
    return (
        <section className=" col-span-full md:col-span-9 lg:col-span-10 lg:row-span-full">
            <div className=" bg-blue-50 lg:h-screen grid grid-cols-1 gap-4 lg:grid-rows-12 p-4">
                <div className="  row-span-1 mt-2 p-2 flex justify-between">
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <a href="/projects/add" className="text-blue-600  hover:text-blue-700 rounded-full text-3xl">
                        <IoMdAddCircleOutline/>     
                    </a>
                </div>
                <div className="col-span-2  lg:row-span-11 rounded-lg p-2 bg-white">
                    <ProjectTable/>
                </div>
                

            </div>
        </section>
    );
}