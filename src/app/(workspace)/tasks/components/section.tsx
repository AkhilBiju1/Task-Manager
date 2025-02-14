import { IoMdAddCircleOutline } from "react-icons/io";
export default function TaskSection() {
    return (
        <section className=" col-span-10 row-span-full">
            <div className=" bg-blue-50 h-screen grid grid-cols-1 gap-4 grid-rows-12 p-4">
                <div className="  row-span-1 mt-2 p-2 flex justify-between">
                    <h1 className="text-2xl font-semibold">Tasks</h1>
                    <a href="task/add" className="text-blue-600  hover:text-blue-700 rounded-full text-3xl">
                        <IoMdAddCircleOutline />
                    </a>
                </div>
                <div className="col-span-2  row-span-11 rounded-lg p-2 bg-white">

                </div>


            </div>
        </section>
    );
}