"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Modal, Button, Spinner } from "react-bootstrap";
import styles from "./signup.css";
import Image from "next/image";
import Link from "next/link";
import { signupApi } from "@/utils/apiRoutes"; // Ensure correct path for signupApi

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: "",
    Password: "",
    reenterPassword: "",
    role: "import/export", // default role
  });
  const [modalMessage, setModalMessage] = useState(null); // state to control modal message
  const [modalMessageType, setModalMessageType] = useState(null); // state to control modal message type
  const [showModal, setShowModal] = useState(false); // state to control modal visibility
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== formData.reenterPassword) {
      setModalMessage("Passwords do not match.");
      setModalMessageType("error");
      setShowModal(true);
      return;
    }
    setLoading(true);
    try {
      await axios.post(signupApi, formData);
      setModalMessage(
        "Verification link has been sent to your email. Please verify to login."
      );
      setModalMessageType("success");
      setShowModal(true);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.error) {
        setModalMessage(error.response.data.error);
      } else {
        setModalMessage("Error signing up.");
      }
      setModalMessageType("error");
      setShowModal(true);
      setLoading(false);
    }
  };

  const handleClose = () => setShowModal(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div
      className={`${styles.signup} w-100 mx-auto d-flex justify-content-center my-3 signupForm`}
    >
      <form onSubmit={handleSubmit} className={`${styles.form} text-center`}>
        <Image
          src="/img/iscbgs.svg"
          className={styles.logo + " mb-3"}
          alt="logo"
          width={50}
          height={50}
        />
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="w-100"
        />
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="w-100"
        />
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-100"
        />
        <input
          type="text"
          name="MobileNumber"
          value={formData.MobileNumber}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-100"
        />
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-100"
        />
        <input
          type="password"
          name="reenterPassword"
          value={formData.reenterPassword}
          onChange={handleChange}
          placeholder="Re-enter Password"
          required
          className="w-100"
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

        {!loading && <button type="submit">Sign Up</button>}
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
        <span className="mt-3 d-block">
          OR <Link href="/login">Login</Link>
        </span>
      </form>

      {/* React-Bootstrap Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{ color: modalMessageType === "success" ? "green" : "red" }}
          >
            {modalMessageType === "success" ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ color: modalMessageType === "success" ? "green" : "red" }}
        >
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignupForm;
