import Image from "next/image";
import Link  from "next/link";
import bgimg from "../../../../public/bg1.jpg"
export default function login() {
    return (
        <div className=" h-screen w-screen grid grid-cols-5 grid-rows-5">
            <div className="col-start-2 row-start-2 col-span-3 row-span-3   flex shadow-custom-color rounded-lg">
                <div className="md:w-1/2 p-2">
                    <Image src={bgimg} alt="bgTask" priority={ true} />
                </div>
                <div className="w-1/2 h-full mt-12  p-10 ">
                    <div>
                        <h2 className="text-center text-3xl my-4 font-semibold">Welcome Back</h2>
                    </div>
                    <form action="">
                        <div className="my-2">
                            <h3 >Username</h3>
                            <input name="uname" type="text" className="w-full border-blue-600 focus:outline-none text-sm border-b-2  focus:border-2 py-1 focus:rounded-md" required />
                        </div>
                        <div className="my-2">
                            <h3 >Password</h3>
                            <input type="password" className="w-full border-blue-600 focus:outline-none text-sm border-b-2  focus:border-2 py-1 focus:rounded-md" required />
                            <p className="text-xs text-red-600">ahdsagdagd</p>
                        </div >
                        
                        <div className="my-4 flex justify-between"> 
                            <button type="submit" className="bg-blue-700 p-2 px-4 rounded-md text-white">Login</button>
                            <div className="p-2"><span className={"text sm"}>Don't have an account? </span> <Link href={"/signup"} className="text-blue-700 underline">Create account</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}