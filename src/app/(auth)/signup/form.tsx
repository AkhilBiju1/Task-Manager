'use client'
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";



export default function FormSignup() {
    const [uname, setUname] = useState('');
    const [pass0, setPass0] = useState('');
    const [pass1, setPass1] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showpass, setshowpass] = useState(false);
    const router = useRouter()
    
    const createAccount = async () => {
        try {
            const res = await axios.post(
                '/api/auth/signup',
                { name: uname, pass: pass0 },
                { headers: { 'Content-Type': 'application/json'} }
            );
            return (res)
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data; 
            } else {
                throw { message: 'Unknown error occurred' }; 
            }
        }

    }

    const { mutate, isError, error, isPending } = useMutation({
        mutationFn: createAccount,
        onSuccess: () => router.replace('/dashboard'), 
        retry: 1,
        retryDelay: 3000
    })
   
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("")
        if (pass0 == pass1) {
            mutate ()
        }
        else {
            setErrorMsg("The passwords do not match!")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-2">
                <h3 >Username</h3>
                <input onChange={(e) => setUname(e.target.value)} type="text" className="w-full border-blue-600 focus:outline-none text-sm border-b-2   py-1 " required />

            </div>
            <div className="my-2">
                <h3 >Password</h3>
                <div className="w-full border-blue-600 border-b-2 flex justify-between">
                    <input onChange={(e) => setPass0(e.target.value)} type={showpass ? 'text' : "password"} className="w-11/12  focus:outline-none  py-1  text-sm  " required /> <span onClick={() => setshowpass(!showpass)} className="w-1/12">{!showpass ? <IoEyeOffOutline /> : <IoEyeOutline />}</span>
                </div>

            </div >
            <div className="my-2">
                <h3 >Confirm password</h3>
                <div className="w-full border-blue-600 border-b-2 flex justify-between">
                    <input onChange={(e) => setPass1(e.target.value)} type={showpass ? 'text' : "password"} className="w-12/12  focus:outline-none  py-1  text-sm  " required />
                </div>
                <p className="text-xs text-red-600">{errorMsg}{isError?error.message
                :""}</p>
            </div>
            <div className="my-4 flex justify-between">
                {isPending ? 
                    <svg aria-hidden="true" className="w-7 h-7 text-blue-700 animate-spin  outline-none border-none fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>:
                <button type="submit" disabled={isPending ? true : false} className="bg-blue-700 p-2 rounded-md disabled:bg-blue-600 text-white"> 
                 Create Account</button>}
                <div className="p-2"><span className="text sm">Already have an account? </span><Link href="/login" className="text-blue-700 underline">Login</Link></div>
            </div>
        </form>
    );
}