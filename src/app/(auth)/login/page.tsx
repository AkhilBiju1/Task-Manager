import Image from "next/image";
import bgimg from "../../../../public/bg1.jpg"
import FormLogin from "./form";

export const metadata = {
    title: "TaskPilot Login"
};

export default function login() {
    return (
        <div className=" h-screen w-screen grid grid-cols-5 grid-rows-6">
            <div className="col-start-2 row-start-2 col-span-3 row-span-4   flex shadow-custom-color rounded-lg">
                <div className="md:w-1/2 p-2">
                    <Image src={bgimg} alt="bgTask" priority={ true} />
                </div>
                <div className="w-1/2 h-full mt-12  p-10 ">
                    <div>
                        <h2 className="text-center text-3xl my-4 font-semibold">Welcome Back</h2>
                    </div>
                   <FormLogin/>
                </div>
            </div>
        </div>
    );
}