import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdGroups } from "react-icons/md";
import { TbBroadcast } from "react-icons/tb";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex items-center bg-[#202c33] text-white h-12 p-3 justify-between">
      <div className="flex items-center gap-x-2">
        <img
          src={currentUser.photoURL}
          alt="username"
          className=" rounded-full object-cover w-10 h-10"
        />
        <span className="text-xs text-white">{currentUser.displayName}</span>
      </div>
      <div className="flex gap-x-3 cursor-pointer items-center">
        <MdGroups size={25} />
        <TbBroadcast size={22} />
        <IoChatboxEllipsesSharp size={22} />
        <CiMenuKebab size={20} />
      </div>
    </div>
  );
};

export default Navbar;
