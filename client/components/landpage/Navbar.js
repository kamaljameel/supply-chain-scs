import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("/");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken?.length) {
      setLoggedIn(true);
    }
  }, []);
  const handleNavToggle = () => {
    setNavToggle(!navToggle);
  };
  // Function to handle setting active link
  const handleSetActiveLink = (href) => {
    setActiveLink(href);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
      <div className="container-fluid">
        <Link href="/" passHref>
          <div className="navbar-brand d-flex align-items-center">
            <Image
              src="/img/iscbgs.svg"
              className="logo"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          onClick={handleNavToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${navToggle ? "show" : ""}`}
          id="navbarCollapse"
        >
          <div className="navbar-nav ms-auto p-4 p-lg-0 align-items-center">
            <Link href="/" passHref className="homeP">
              <div
                className={`nav-item nav-link ${
                  activeLink === "/" ? "active" : ""
                }`}
                onClick={() => handleSetActiveLink("/")}
              >
                Home
              </div>
            </Link>
            <Link
              href="/about"
              passHref
              className="aboutP"
              onClick={() => handleSetActiveLink("/about")}
            >
              <div
                className={`nav-item nav-link ${
                  activeLink === "/about" ? "active" : ""
                }`}
              >
                About
              </div>
            </Link>
            <Link href="/services" passHref className="servicesP">
              <div
                className={`nav-item nav-link ${
                  activeLink === "/services" ? "active" : ""
                }`}
                onClick={() => handleSetActiveLink("/services")}
              >
                Services
              </div>
            </Link>
            <Link href="/contact" passHref>
              <div
                className={`nav-item nav-link ${
                  activeLink === "/contact" ? "active" : ""
                }`}
                onClick={() => handleSetActiveLink("/contact")}
              >
                Contact
              </div>
            </Link>

            <h4 className="m-0 d-none d-lg-block">
              <i className="bi bi-telephone-forward-fill text-primary me-2"></i>
              +44 7459 041500
            </h4>
          </div>
        </div>
        <span className="ms-3">
          {isLoggedIn ? (
            <Link href="/signup" passHref>
              {/* <button className="btn border-1 border-black rounded-3 text-primary">
                    Sign Up
                  </button> */}
            </Link>
          ) : (
            <div>
              <Link href="/dashboard" passHref className="me-2 text-dark">
                My Dashboard
              </Link>

              <button
                onClick={logout}
                className="btn btn-primary text-white rounded-3"
              >
                Logout
              </button>
            </div>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
