import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import ChatManager from "../views/ChatManager";
const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<ChatManager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
