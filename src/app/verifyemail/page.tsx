"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Verify Email</h1>

        {token ? (
          <p className="text-gray-600 mb-6">
            Verifying your email with token:{" "}
            <span className="font-semibold text-blue-600 break-words">{token}</span>
          </p>
        ) : (
          <p className="text-gray-600 mb-6">No token provided in the URL.</p>
        )}

        {verified ? (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Email Verified Successfully!</h2>
            <Link
              href="/login"
              className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition-all"
            >
              Go to Login
            </Link>
          </div>
        ) : error ? (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-4">
              There was an issue verifying your email. Please try again.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-lg text-gray-600">Processing verification...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
