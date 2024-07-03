"use client";

import { useState } from "react";
import axios from "axios";
import { contactApi } from "@/utils/apiRoutes"; // Adjust the import path as needed

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    textContent: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(contactApi, formData); // Use contactApi for the endpoint
      setResponseMessage(res.data.message);
    } catch (error) {
      console.error("Failed to send message", error);
      setResponseMessage(
        error.response?.data?.message || "Failed to send message"
      );
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="textContent"
          placeholder="Message Text"
          value={formData.textContent}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
