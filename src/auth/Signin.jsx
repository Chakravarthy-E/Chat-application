import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase.js";
import { toast, Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signin = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-center items-center h-[100dvh] font-montserrat">
        <div className="border px-10 py-10 flex  flex-col gap-y-3 rounded-lg">
          <h2 className="text-2xl my-2 uppercase text-center font-obi font-semibold tracking-wide">
            Sign in
          </h2>
          <form>
            <div className="flex flex-col mb-1">
              <label htmlFor="email text-sm">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                name="email"
                className="px-3 py-1 rounded outline-none"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                name="email"
                className="px-3 py-1 rounded outline-none"
              />
            </div>
          </form>
          <button className="px-3 py-1 hover:bg-indigo-900  bg-indigo-700 rounded-md">
            Login
          </button>
          <button
            onClick={signInWithGoogle}
            className="px-3 py-1 hover:bg-indigo-900  bg-indigo-700 rounded-md"
          >
            Sign in with Google
          </button>
          <p className="text-sm text-center">
            Don't have Account?{" "}
            <Link
              className="text-sm hover:text-indigo-900 text-blue-500"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
