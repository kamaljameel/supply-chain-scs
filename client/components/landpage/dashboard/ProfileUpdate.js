import React, { useState, useEffect } from "react";
import axios from "axios";
import { profileApi, loginApi } from "@/utils/apiRoutes";
import styles from "../../../app/signup/signup.css";
const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    LastName: "",
    Address: "",
    City: "",
    State: "",
    Country: "",
    ZipCode: "",
    ProfilePicture: "",
  });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileLoader, setprofileLoader] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(`${loginApi}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLoading(false);
          setUser(response.data.user);

          setFormData(response.data.user); // Populate form with user data
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User is not authenticated.");
      return;
    }
    setprofileLoader(true);
    try {
      const response = await axios.put(
        `${profileApi}/${user.id}`, // Use the API route from apiRoutes
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setprofileLoader(false);
        setMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div
      className={`${styles.signup} w-100 mx-auto d-flex flex-column align-items-center justify-content-center my-3 signupForm`}
    >
      <h2 className="mb-3">Update Profile</h2>
      <form onSubmit={handleSubmit} className={`${styles.form} text-center`}>
        <div>
          <label htmlFor="Address">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Address">Address:</label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="City">City:</label>
          <input
            type="text"
            id="City"
            name="City"
            value={formData.City || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="State">State:</label>
          <input
            type="text"
            id="State"
            name="State"
            value={formData.State || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Country">Country:</label>
          <input
            type="text"
            id="Country"
            name="Country"
            value={formData.Country || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ZipCode">Zip Code:</label>
          <input
            type="text"
            id="ZipCode"
            name="ZipCode"
            value={formData.ZipCode || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ProfilePicture">Profile Picture URL:</label>
          <input
            type="text"
            id="ProfilePicture"
            name="ProfilePicture"
            value={formData.ProfilePicture || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {profileLoader ? "Updating...." : "Update Profile"}
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProfileUpdate;
