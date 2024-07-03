import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { loginApi } from "@/utils/apiRoutes";
import { signupApi } from "@/utils/apiRoutes";
import { userApi } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";
// Create context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const router = useRouter();
  // Check if user is authenticated on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  // Function to check authentication status
  const checkAuth = async () => {
    try {
      const response = await axios.get(userApi); // Adjust endpoint as needed
      setUser(response.data.user); // Set user if authenticated
    } catch (error) {
      setUser(null); // Set user to null if not authenticated or error occurs
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post(loginApi, credentials); // Adjust endpoint as needed
      setUser(response.data.user); // Set user upon successful login
      localStorage.setItem("accessToken", response.data.accessToken); // Store token in localStorage
    } catch (error) {
      setUser(null); // Set user to null if login fails
      throw new Error(error.response.data.error || "Login failed");
    }
  };
  // Signup function
  const signup = async (formData) => {
    try {
      const response = await axios.post(signupApi, formData); // Adjust endpoint as needed
      setUser(response.data.user); // Set user upon successful signup
      localStorage.setItem("accessToken", response.data.accessToken); // Store token in localStorage
      router.push("/login"); // Redirect to login page after successful signup
    } catch (error) {
      setUser(null); // Set user to null if signup fails
      throw new Error(error.response.data.error || "Signup failed");
    }
  };
  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Adjust endpoint as needed
      setUser(null); // Clear user upon successful logout
      localStorage.removeItem("accessToken"); // Remove token from localStorage
    } catch (error) {
      throw new Error(error.response.data.error || "Logout failed");
    }
  };

  // Value object for context provider
  const authContextValue = {
    user,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
