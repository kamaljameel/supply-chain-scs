"use client";
// pages/reset-password.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { resetPasswordApi } from "@/utils/apiRoutes";
const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
    } else {
      setError("Invalid or missing token");
    }
  }, []);
  console.log("resettoken", token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(resetPasswordApi, {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      router.push("/login");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {message && (
        <Alert variant="success" className="mt-3">
          {message}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default ResetPassword;
