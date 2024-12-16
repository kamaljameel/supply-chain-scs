"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginApi } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";

import styles from "./login.css";
import Link from "next/link";
import { Button, Spinner } from "react-bootstrap";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(loginApi, formData);
      // Assuming your API returns an access token upon successful login
      localStorage.setItem("accessToken", response.data.accessToken); // Store token in localStorage
      localStorage.setItem("abisolToken", response.data.abisolToken);
      setError(null);

      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        setError(error.response.data.error || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
        setError("No response received from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error message:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="loginmaincon">
      <div className="logincont">
        <Link href={"/"} passHref>
          Home
        </Link>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          {!loading && <button type="submit">Login</button>}
          {loading && (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          )}
          <div className="mt-2">
            <Link href="/forgotpassword" className="text-primary">
              Forgot Password?
            </Link>
            <span className="mx-2">OR</span>
            <Link href="/signup" passHref className="text-primary fw-medium">
              Sign Up
            </Link>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
