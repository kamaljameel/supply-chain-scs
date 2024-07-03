"use client";

import Dashboard from "@/components/landpage/dashboard/Dashboard";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken?.length) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="w-100 h-100">
      <Dashboard />
    </div>
  );
}
