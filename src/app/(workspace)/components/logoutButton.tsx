'use client'
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function LogoutButton() {
    const router = useRouter()
    const logoutfetch = async() => {
        try {
            const res = await axios.get('/api/auth/logout')
            return res
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }
    }
    const logoutMutation = useMutation({
        mutationFn: logoutfetch,
        onSuccess: () => router.replace('/login'),
        retry:1
    })
    const logout = () => {
        logoutMutation.mutate()
    }
    return <button onClick={logout}>{logoutMutation.isSuccess?'Logging out..':'Logout'}</button>
}