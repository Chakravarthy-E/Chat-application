import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import ChatManager from "../views/ChatManager";
import { AuthContext } from "../context/AuthContext";
const PageRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <ChatManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
