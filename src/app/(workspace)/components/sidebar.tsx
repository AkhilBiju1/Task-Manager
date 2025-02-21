'use client'
import { GoTasklist } from "react-icons/go";
import LogoutButton from "./logoutButton";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";


export default function Sidebar() {
    const [menu,setMenu] = useState(false)
    return (
        <section className="bg-white col-span-full md:col-span-3 lg:col-span-2   lg:row-span-full m-4 md:me-0  rounded-lg"> 
            <div className="container  p-3 flex justify-between md:justify-start">
                <div className="flex"> <GoTasklist className="block text-3xl text-blue-800 " /><h1 className="text-xl  ">TaskPilot</h1></div>
                <div className=" flex  md:hidden"> <IoMenu className="block text-3xl text-blue-800 " onClick={()=>setMenu(!menu)} /></div>

            </div>
            <div className='md:hidden'>
                <ul className={`md:container md:h-4/6 md:p-3 md:mt-4   md:block ${`${menu ? 'opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-700 ease-in-out`}`}>

                    <li className="m-3"><Link replace href="/dashboard">Dashboard</Link></li>
                    <li className="m-3"><Link replace href="/tasks">Tasks</Link></li>
                    <li className="m-3 "><Link href="/projects">Projects</Link></li>
                    <li className=" m-3 "><LogoutButton /></li>
                </ul>
            </div>
            <ul className={`md:container md:h-4/6 md:p-3 md:mt-4 hidden  md:block `}>

                <li className="m-3"><Link replace href="/dashboard">Dashboard</Link></li>
                <li className="m-3"><Link replace href="/tasks">Tasks</Link></li>
                <li className="m-3 "><Link href="/projects">Projects</Link></li>
                <li className=" m-3 "><LogoutButton /></li>
            </ul>
            
        </section>
    );
}