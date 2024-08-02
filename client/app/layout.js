import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../styles/global.scss";
import "../styles/style.css";
// import "@fontsource/open-sans";
// import "@fontsource/open-sans/500.css";
// import "@fontsource/open-sans/index.css";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ISCS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
