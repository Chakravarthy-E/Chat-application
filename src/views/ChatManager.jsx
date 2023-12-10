import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const ChatManager = () => {
  return (
    <div className="flex justify-center items-center h-[100dvh] font-montserrat">
      <div className="w-full h-full flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatManager;
