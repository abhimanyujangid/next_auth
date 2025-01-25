"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
      toast.error("Logout failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log("User details:", res.data);
      setData(res.data.data._id || "No ID found");
      toast.success("User details fetched successfully");
    } catch (error: any) {
      console.error("Failed to fetch user details:", error.message);
      toast.error("Failed to fetch user details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Profile Page</h1>
        <hr className="mb-6" />
        <p className="text-lg text-gray-600 text-center mb-4">
          Welcome to your profile page.
        </p>
        <div className="text-center mb-6">
          <h2 className="p-2 bg-green-500 text-white rounded-lg inline-block">
            {data === "nothing" ? "No data available" : <Link href={`/profile/${data}`}>{data}</Link>}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={getUserDetails}
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Fetching User Details..." : "Get User Details"}
          </button>
          <button
            onClick={logout}
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Logging Out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
