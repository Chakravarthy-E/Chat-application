import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
