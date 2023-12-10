import React, { useContext } from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div id="chat" className="flex w-full flex-col">
      <div
        id="chatInfo"
        className=" h-[50px] bg-[#202c33] flex w-full justify-between items-center px-3"
      >
        <div>
          <span className="text-white">{data.user?.displayName}</span>
        </div>
        <div id="chatIcons" className="text-white flex items-center gap-x-5 ">
          <button className="hover:text-gray-500">
            <GoDeviceCameraVideo size={20} />
          </button>
          <button className="hover:text-gray-500">
            <FaPhoneAlt size={15} />
          </button>
          <button className="hover:text-gray-500">
            <MdMoreVert size={20} />
          </button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
