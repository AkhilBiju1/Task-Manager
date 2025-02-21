import Image from "next/image";
import bgimg from "../../../../public/bg1.jpg"
import Form from "./form";

export const metadata = {
    title: "TaskPilot Signup"
};

export default function Signup() {
    return (
        <div className=" h-screen w-screen grid  grid-rows-6   grid-cols-9 md:grid-cols-5">
            <div className=" col-start-2 row-start-2 col-span-7 row-span-3 md:col-start-2 md:row-start-2 md:col-span-3 md:row-span-4 shadow-custom-color bg-white rounded-lg flex">
                <div className="md:w-1/2 hidden md:block p-2">
                    <Image src={bgimg} alt="bgTask" priority={ true} />
                </div>
                <div className=" w-full md:w-1/2 px-10 py-4">
                    <div>
                        <h2 className="text-center text-3xl my-4 font-semibold">Create An Account</h2>
                    </div>
                   <Form/>
                </div>
            </div>
        </div>
    );
}