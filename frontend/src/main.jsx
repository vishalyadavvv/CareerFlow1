// main.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { URL } from "../constant/api";

export const Context = createContext({
  isAuthorized: false,
});

export const useAppContext = () => useContext(Context);

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${URL}/v1/user/profile`, {
        withCredentials: true,
      });
      setIsAuthorized(true);
      setUser(data.user);
    } catch (error) {
      setIsAuthorized(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Run in background
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        checkAuth,
        loading, // pass loading state for protected routes
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);