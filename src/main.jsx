import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AOS from "aos";
import "./index.css";
AOS.init();
import { AuthContext, AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuthContext.Consumer>
        {(authcontextValue) => (
          <ChatContextProvider>
            <App authcontextValue={authcontextValue} />
          </ChatContextProvider>
        )}
      </AuthContext.Consumer>
    </AuthContextProvider>
  </React.StrictMode>
);
