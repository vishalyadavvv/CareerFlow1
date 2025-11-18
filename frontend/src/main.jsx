import React, { createContext, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { URL } from "../constant/api";

export const Context = createContext({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  checkAuth: () => {},
});

export const useAppContext = () => useContext(Context);

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Quick check for token existence first
      const hasToken = localStorage.getItem("careerflow-token") || 
                       document.cookie.includes("token=");
      
      if (!hasToken) {
        setIsAuthorized(false);
        setUser(null);
        setLoading(false);
        return;
      }

      // Verify token with backend
      const { data } = await axios.get(`${URL}/v1/user/getuser`, {
        withCredentials: true,
        timeout: 8000,
      });
      
      if (data?.user) {
        setIsAuthorized(true);
        setUser(data.user);
      } else {
        setIsAuthorized(false);
        setUser(null);
        localStorage.removeItem("careerflow-token");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthorized(false);
      setUser(null);
      
      // Clear invalid tokens
      localStorage.removeItem("careerflow-token");
      if (error.response?.status === 401 || error.response?.status === 403) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh function for after login/logout
  const refreshAuth = async () => {
    await checkAuth();
  };

  useEffect(() => {
    // Check auth on mount
    checkAuth();
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        loading,
        checkAuth: refreshAuth,
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