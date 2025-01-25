"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error("Signup failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 py-6 px-4 text-gray-700">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr className="mb-6" />
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-gray-500 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-gray-500 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring focus:ring-gray-500 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full p-3 rounded-lg text-white font-semibold ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Login
            </span> 
          </Link>
        </p>
      </div>
      <div id="toast-container" />
    </div>
  );
}
