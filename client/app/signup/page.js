"use client";
import { useState } from "react";
import axios from "axios";
import { signupApi } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";
import styles from "./signup.css";
import Image from "next/image";
import Link from "next/link";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    reenterPassword: "",
    role: "import/export", // default role
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.reenterPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(signupApi, formData);
      setSuccessMessage("Signup successful!");
      setError(null);
      router.push("/login");
    } catch (error) {
      setError(error.response.data.error || "Error signing up.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Image
          src="/img/iscbgs.svg"
          className="logo mb-3"
          alt="logo"
          width={50}
          height={50}
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
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
        <input
          type="password"
          name="reenterPassword"
          value={formData.reenterPassword}
          onChange={handleChange}
          placeholder="Re-enter Password"
          required
        />
        <div>
          <input
            type="radio"
            id="import"
            name="role"
            value="import/export"
            checked={formData.role === "import/export"}
            onChange={handleChange}
          />
          <label htmlFor="import">Importer/Exporter</label>
        </div>
        <div>
          <input
            type="radio"
            id="provider"
            name="role"
            value="freight provider/services provider"
            checked={formData.role === "freight provider/services provider"}
            onChange={handleChange}
          />
          <label htmlFor="provider">Freight Provider/Services Provider</label>
        </div>
        <button type="submit">Sign Up</button>{" "}
        <span>
          {error && (
            <p style={{ color: "red" }}>
              You have already account please Login
            </p>
          )}
          OR <Link href="/login">Login</Link>
        </span>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
