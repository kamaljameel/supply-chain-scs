"use client";
import { useState } from "react";
import axios from "axios";
import { loginApi } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";

import styles from "./login.css";
const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginApi, formData);
      // Assuming your API returns an access token upon successful login
      localStorage.setItem("accessToken", response.data.accessToken); // Store token in localStorage
      setError(null);

      // Redirect to dashboard or another protected route upon successful login
      // Replace '/dashboard' with your actual protected route

      // router.push("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.response.data.error || "Login failed"); // Assuming your API returns an error message
    }
  };

  return (
    <div className="logincont">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
