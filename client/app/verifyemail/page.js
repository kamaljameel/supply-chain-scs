"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { verifyEmailApi } from "@/utils/apiRoutes";
import { useSearchParams, useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";

const VerificationEmail = () => {
  const [token, setToken] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter(); // Use the correct definition of useRouter
  const [loadingv, setLoadingv] = useState(false);
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
  }, [searchParams]);

  const handleVerify = async () => {
    setLoadingv(true);
    try {
      const response = await axios.post(verifyEmailApi, { token });

      setVerificationStatus("Email verified successfully!");
      setTimeout(() => {
        router.push("/login");
        setLoadingv(false);
      }, 1000);
    } catch (error) {
      setVerificationStatus("Email verification failed. Please try again.");
      setLoadingv(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h1>Email Verification</h1>
        <button
          onClick={handleVerify}
          className="btn btn-secondary text-white rounded-5 border-0 fs-4 px-4"
        >
          Verify Email
        </button>
        {verificationStatus && (
          <p className="text-center mt-2">{verificationStatus}</p>
        )}
        <div className="w-100">
          {loadingv && <Spinner animation="grow" variant="info" />}
        </div>
      </div>
    </div>
  );
};

const SuspenseVerificationEmail = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerificationEmail />
  </Suspense>
);

export default SuspenseVerificationEmail;
