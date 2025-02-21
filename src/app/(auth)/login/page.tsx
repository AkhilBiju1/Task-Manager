import Image from "next/image";
import bgimg from "../../../../public/bg1.jpg"
import FormLogin from "./form";

export const metadata = {
    title: "TaskPilot Login"
};

export default function login() {
    return (
        <div className=" h-screen w-screen grid grid-cols-9 grid-rows-6  md:grid-cols-5 ">
            <div className=" col-start-2 row-start-2 col-span-7 row-span-4 md:col-start-2 md:row-start-2 md:col-span-3 md:row-span-4 bg-white  flex shadow-custom-color rounded-lg">
                <div className="md:w-1/2 p-2 hidden md:block">
                    <Image src={bgimg} alt="bgTask" priority={ true} />
                </div>
                <div className=" w-full md:w-1/2 h-full mt-12  p-10 ">
                    <div>
                        <h2 className="text-center text-3xl my-4 font-semibold">Welcome Back</h2>
                    </div>
                   <FormLogin/>
                </div>
            </div>
        </div>
    );
}