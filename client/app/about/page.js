"use client";
import About from "@/components/landpage/About";
import Contact from "@/components/landpage/Contact";
import Footer from "@/components/landpage/Footer";
import Navbar from "@/components/landpage/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <div
        class="container-fluid page-header py-5"
        style={{ marginBottom: "6rem" }}
      >
        <div class="container py-5">
          <h1 class="display-3 text-white mb-3 animated slideInDown">
            About Us
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="text-white" href="#">
                  Home
                </a>
              </li>
              <li class="breadcrumb-item">
                <a class="text-white" href="#">
                  Pages
                </a>
              </li>
              <li class="breadcrumb-item text-white active" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <About />
      <div className="container-fluid overflow-hidden py-5 px-lg-0">
        <div className="container contact-page py-5 px-lg-0">
          <div className="row g-5 mx-lg-0">
            <div
              className="col-md-6 contact-form-p wow fadeIn ps-0"
              data-wow-delay="0.1s"
              style={{
                visibility: "visible",
                animationDelay: "0.1s",
                animationName: "fadeIn",
              }}
            >
              <Contact />
            </div>
            <div
              className="col-md-6 pe-lg-0 wow fadeInRight"
              data-wow-delay="0.1s"
              style={{
                visibility: "visible",
                animationDelay: "0.1s",
                animationName: "fadeInRight",
              }}
            >
              <div className="position-relative h-100 rounded-4 overflow-hidden">
                <iframe
                  className="position-absolute w-100 h-100"
                  style={{ objectFit: "cover" }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.8019186468623!2d-1.8281237000000001!3d52.4465029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bbcccd7699d1%3A0x3a356ec08e28c01b!2s7%20Grove%20Ave%2C%20Acocks%20Green%2C%20Birmingham%20B27%207UY%2C%20UK!5e0!3m2!1sen!2s!4v1718956665603!5m2!1sen!2s"
                  frameBorder="0"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
