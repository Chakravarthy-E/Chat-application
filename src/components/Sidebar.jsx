import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import Chats from "./Chats.jsx";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div className="w-1/3 bg-[#111b21] relative">
      <Navbar />
      <Search />
      <Chats />
      <button
        onClick={handleLogout}
        className=" absolute bottom-1 font-semibold left-56 text-white  bg-black px-4 py-1 rounded hover:bg-white hover:text-black"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
