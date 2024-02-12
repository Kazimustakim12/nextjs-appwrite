"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const LoginPage = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Loginfailed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "laodding" : "Login"}</h1>

      <div className="input-div">
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
      <div className="input-div">
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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none bg-blue-600 text-white"
      >
        Login
      </button>
      <Link href="/signup" className="text-gray-600 hover:text-blue-600">
        visit to register here
      </Link>
    </div>
  );
};

export default LoginPage;
