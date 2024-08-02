"use client";
// pages/forgot-password.js
import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { forgotPasswordApi } from "@/utils/apiRoutes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(forgotPasswordApi, { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container mt-5 w-100 d-grid justify-content-center">
      <h2>Forgot Password</h2>
      <Form onSubmit={handleSubmit} className="d-flex">
        <Form.Group controlId="formEmail" className="w-auto">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
