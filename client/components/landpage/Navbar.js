import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
    <Link href="/" passHref>
      <div className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <Image
          src="/img/logois.svg"
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
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto p-4 p-lg-0 align-items-center">
        <Link href="/index.html" passHref>
          <div className="nav-item nav-link active">Home</div>
        </Link>
        <Link href="/about.html" passHref>
          <div className="nav-item nav-link">About</div>
        </Link>
        <Link href="/service.html" passHref>
          <div className="nav-item nav-link">Services</div>
        </Link>
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Pages
          </a>
          <div className="dropdown-menu fade-up m-0">
            <Link href="/price.html" passHref>
              <div className="dropdown-item">Pricing Plan</div>
            </Link>
            <Link href="/feature.html" passHref>
              <div className="dropdown-item">Features</div>
            </Link>
            <Link href="/quote.html" passHref>
              <div className="dropdown-item">Free Quote</div>
            </Link>
            <Link href="/team.html" passHref>
              <div className="dropdown-item">Our Team</div>
            </Link>
            <Link href="/testimonial.html" passHref>
              <div className="dropdown-item">Testimonial</div>
            </Link>
            <Link href="/404.html" passHref>
              <div className="dropdown-item">404 Page</div>
            </Link>
          </div>
        </div>
        <h4 className="m-0 pe-lg-5 d-none d-lg-block">
          <i className="bi bi-headphones text-primary me-2"></i>+44 7459
          041500
        </h4>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;