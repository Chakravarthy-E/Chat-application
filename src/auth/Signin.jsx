import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase.js";
import { toast, Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;

        await updateProfile(user, {
          displayName,
          photoURL,
        });

        await setDoc(userDocRef, {
          uid: user.uid,
          displayName,
          email,
          photoURL,
        });

        toast.success("Registration Successful");
      } else {
        toast.success("Login Successful");
      }
      setTimeout(() => {
        navigate("/chats");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userData.email;
    const password = userData.password;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successfull");
      setTimeout(() => {
        navigate("/chats");
      }, 1000);
    } catch (error) {}
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-center items-center h-[100dvh] font-montserrat">
        <div className="border px-10 py-10 flex  flex-col gap-y-3 rounded-lg">
          <h2 className="text-2xl my-2 uppercase text-center font-obi font-semibold tracking-wide">
            Sign in
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-1">
              <label htmlFor="email text-sm">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                name="email"
                className="px-3 py-1 rounded outline-none"
                value={userData.email}
                onChange={(e) =>
                  setUserData((data) => ({
                    ...data,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                name="email"
                className="px-3 py-1 rounded outline-none"
                value={userData.password}
                onChange={(e) =>
                  setUserData((data) => ({
                    ...data,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1 w-full hover:bg-indigo-900  bg-indigo-700 rounded-md"
            >
              Login
            </button>
          </form>
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
