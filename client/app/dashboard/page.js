"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/landpage/dashboard/Dashboard";

export default function page() {
  const router = useRouter();

  const [tokenlent, setTokenlent] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken?.length) {
      router.push("/login");
    } else if (accessToken.length > 4) {
      setTokenlent(true);
    } else {
      setTokenlent(false);
    }
  }, []);

  return (
    <div className="w-100 h-100 dashboardpage">
      {tokenlent && <Dashboard />}
    </div>
  );
}
