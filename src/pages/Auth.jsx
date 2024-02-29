"use client";
import { auth, googleAuthProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate(); // Initialize useRouter

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const SignIn = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/Home"); // Use navigate
      toast.success("Signed In successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error signing in");
    } finally {
      setLoading(false);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast.success("Signed In successfully!");
      navigate("/Home"); // Use navigate
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" min-h-full w-1/3 mx-auto my-[5%] p-5 bg-slate-50 border rounded-md grid">
        <p className="text-center text-blue-500 text-lg">Sign In</p>
        <input
          className="w-full p-2  rounded m-2 items-center mx-auto border "
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2  rounded m-2 items-center mx-auto border"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="py-1 px-5 w-fit text-center text-blue-800 bg-blue-400 rounded-md m-2 items-center mx-auto mb-6"
          onClick={SignIn}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <span className="flex">
          Do you have a Google account?
          <button
            className="font-bold text-blue-500 hover:text-green-500 pl-2"
            onClick={SignInWithGoogle}
          >
            {" "}
            Sign with google
          </button>
        </span>
      </div>
    </>
  );
}
