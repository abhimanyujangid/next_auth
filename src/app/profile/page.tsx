"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";    
import { toast } from "react-hot-toast";



export default function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            router.push("/login");
            toast.success("Logout successful");
        } catch (error) {
        console.error(error);
        }
    };

    const [userDetails, setUserDetails] = useState<{
        email: string;
        id: string;
        username: string;
    } | null>(null);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get("/api/users/me");
                setUserDetails(response.data.data);
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching user details");
            }
        };
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-20 px-4 text-gray-700">
            <h1 className="text-5xl font-bold mb-4">Profile Page</h1>
            <p className="text-2xl">This is your profile page.</p>
            <p className="text-lg">You can update your profile information here.</p>

            <form className="w-full max-w-sm mt-8">
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Username" aria-label="Username" value={userDetails?.username || ""} />
                </div>
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Email address" aria-label="Email address" value={userDetails?.email || ""} />
                </div>
                <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Update
                    </button>
                </div>
            </form>

            <button className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
                Logout
            </button>
        </div>
    );
}

