"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  const [loading, setLoading] = useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Success", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log("signupfailed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading....." : " Signup"}</h1>
      <div className="input">
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border-gray-300 mb-4 focus:outline-none focus:border-gray-100 rounded-lg"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
        />
      </div>
      <div className="input">
        <label htmlFor="email">email</label>
        <input
          className="p-2 border-gray-300 mb-4 focus:outline-none focus:border-gray-100 rounded-lg"
          type="text"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter username"
        />
      </div>
      <div className="input">
        <label htmlFor="password">password</label>
        <input
          className="p-2 border-gray-300 mb-4 focus:outline-none focus:border-gray-100 rounded-lg"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter username"
        />
      </div>
      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none bg-blue-600 text-white"
      >
        {buttonDisable ? "No Signup" : "Signup"}
      </button>
      <Link href="/login" className="text-gray-600 hover:text-blue-600">
        visit to Login
      </Link>
    </div>
  );
};

export default SignUpPage;
