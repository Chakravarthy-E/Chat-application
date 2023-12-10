import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import { auth, db, googleProvider, storage } from "../config/firebase.js";
import { toast, Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const file = e.target[2].files[0];
    const password = e.target[3].value;
    console.log(displayName, email, password, file);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success("register successful");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          });
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Check if the user is newly created (no existing data in Firestore)
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        // Newly registered user
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
  
        // Update user profile
        await updateProfile(user, {
          displayName,
          photoURL,
        });
  
        // Store user data in Firestore
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName,
          email,
          photoURL,
        });
  
        // Additional actions if needed
  
        toast.success("Registration Successful");
      } else {
        // Existing user, perform additional actions if needed
  
        toast.success("Login Successful");
      }
  
      // Redirect the user after login or registration
      setTimeout(() => {
        navigate("/chats");
      }, 1000);
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
            Sign up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="enter your name"
                name="name"
                className="px-3 py-1 rounded outline-none"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                name="email"
                className="px-3 py-1 rounded outline-none"
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="file">Add an avatar</label>
              <input
                type="file"
                id="file"
                name="avatar"
                required
                className="items-center border bg-[#3b3b3b] py-1 px-3 rounded gap-x-3"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="px-3 py-1 rounded outline-none"
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
            Sign up with Google
          </button>
          <p className="text-sm text-center">
            Don't have Account?{" "}
            <Link
              className="text-sm hover:text-indigo-900 text-blue-500"
              to="/"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
