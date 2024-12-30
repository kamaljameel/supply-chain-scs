import React, { useState, useEffect } from "react";
import axios from "axios";
import { profileApi, loginApi } from "@/utils/apiRoutes";
const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true); // To handle loading state

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
          //   const profileresponse = await axios.get(`${profileApi}/${user.id}`, {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   });
          setFormData(response.data.user); // Populate form with user data
          console.log("pprroooo", response.data);
          console.log(response.data.user);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, []);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         setLoading(true);

  //         const response = await axios.get(`${profileApi}/${user.id}`);
  //         setFormData(response.data); // Populate form with user data
  //         console.log("pprroooo", response.data);
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err.response?.data?.message || "Failed to load user data.");
  //         setLoading(false);
  //       }
  //     };

  //     fetchUserData();
  //   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(`${profileApi}/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update Profile</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProfileUpdate;
