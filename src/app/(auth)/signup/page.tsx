import Image from "next/image";
import Link  from "next/link";
import bgimg from "../../../../public/bg1.jpg"
export default function Signup() {
    return (
        <div className=" h-screen w-screen grid grid-cols-5 grid-rows-5">
            <div className="col-start-2 row-start-2 col-span-3 row-span-3  shadow-custom-color rounded-lg flex">
                <div className="md:w-1/2 p-2">
                    <Image src={bgimg} alt="bgTask" priority={ true} />
                </div>
                <div className="md:w-1/2 w-full  px-10 py-4">
                    <div>
                        <h2 className="text-center text-3xl my-4 font-semibold">Create An Account</h2>
                    </div>
                    <form action="">
                        <div className="my-2">
                            <h3 >Username</h3>
                            <input name="uname" type="text" className="w-full border-blue-600 focus:outline-none text-sm border-b-2  focus:border-2 py-1 focus:rounded-md" required />
                            <p className="text-xs text-red-600">ahdsagdagd</p>
                        </div>
                        <div className="my-2">
                            <h3 >Password</h3>
                            <input type="password" className="w-full border-blue-600 focus:outline-none text-sm border-b-2  focus:border-2 py-1 focus:rounded-md" required />
                            <p className="text-xs text-red-600">ahdsagdagd</p>
                        </div >
                        <div className="my-2">
                            <h3 >Confirm password</h3>
                            <input type="password" className="w-full border-blue-600 focus:outline-none focus:border-2 py-1 focus:rounded-md text-sm border-b-2 " required/>
                            
 
                        </div>
                        <div className="my-4 flex justify-between"> 
                            <button type="submit" className="bg-blue-700 p-2 rounded-md text-white">Create Account</button>
                            <div className="p-2"><span className="text sm">Already have an account? </span><Link href="/login" className="text-blue-700 underline">Login</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}