import React, { useState, useEffect } from "react";
import axios from "axios";
import { profileApi, loginApi } from "@/utils/apiRoutes";
import styles from "../../../app/signup/signup.css";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    City: "",
    State: "",
    Country: "",
    ZipCode: "",
    companyName: "",
    companyAddress: "",
    companyCityStateZip: "",
    companyPostCode: "",
    ProfilePicture: "",
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileLoader, setprofileLoader] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_HOST;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
    }
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
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "ProfilePicture") {
          formDataToSend.append(key, formData[key] || "");
        }
      });

      // Append file if selected
      if (profilePictureFile) {
        formDataToSend.append("ProfilePicture", profilePictureFile);
      }

      const response = await axios.put(
        `${profileApi}/${user.id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type - let browser set it for FormData
          },
        }
      );

      if (response.status === 200) {
        setprofileLoader(false);
        setMessage("Profile updated successfully!");

        // Update the user state with the response data
        setUser(response.data.user);
        setFormData(response.data.user);

        // Clear the file input
        setProfilePictureFile(null);

        // Reset file input
        const fileInput = document.getElementById("ProfilePicture");
        if (fileInput) fileInput.value = "";
      } else {
        setprofileLoader(false);
        setError("Failed to update profile.");
      }
    } catch (err) {
      setprofileLoader(false);
      console.error("Update error:", err);
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
          <label>First Name</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="LastName">Last Name:</label>
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
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="companyCityStateZip">Company City/State/Zip</label>
          <input
            type="text"
            id="companyCityStateZip"
            name="companyCityStateZip"
            value={formData.companyCityStateZip || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="companyPostCode">Company Post Code</label>
          <input
            type="text"
            id="companyPostCode"
            name="companyPostCode"
            value={formData.companyPostCode || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="ProfilePicture">Profile Picture:</label>

          {/* Image Preview */}
          <div className="d-flex align-items-center gap-3">
            <div className="mb-0">
              <img
                src={
                  profilePictureFile
                    ? URL.createObjectURL(profilePictureFile) // Preview new image
                    : formData.ProfilePicture
                    ? `${API_BASE_URL}/uploads/${formData.ProfilePicture}` // Show saved image
                    : "/default-user-icon.png"
                }
                alt="Profile"
                className="profilePic object-cover border"
              />
            </div>

            <input
              type="file"
              id="ProfilePicture"
              name="ProfilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button type="submit" disabled={profileLoader}>
          {profileLoader ? "Updating...." : "Update Profile"}
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProfileUpdate;
