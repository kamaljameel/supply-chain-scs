// components/ClientSessionProvider.js
"use client"; // This directive tells Next.js that this file is a Client Component

import { SessionProvider } from "next-auth/react";

const ClientSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
