"use client";
import ProfileUpdate from "@/components/landpage/dashboard/ProfileUpdate";
import Footer from "@/components/landpage/Footer";
import Navbar from "@/components/landpage/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <ProfileUpdate />
      <Footer />
    </div>
  );
}
