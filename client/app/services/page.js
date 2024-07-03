"use client";
import React from "react";
import Link from "next/link";

import Footer from "@/components/landpage/Footer";
import Navbar from "@/components/landpage/Navbar";
import Testimslider from "@/components/landpage/Testimslider";
import Testimonial from "@/components/landpage/Testimonial";
import ServiceItem from "@/components/landpage/ServiceItem";
import services from "@/data/servicesData";
export default function Servicess() {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid page-header py-5"
        style={{ marginBottom: "6rem" }}
      >
        <div className="container py-5">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Services
          </h1>
          <nav aria-label="breadcrumb" className="animated slideInDown">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-white" href="">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-white" href="">
                  Pages
                </Link>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Services
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-fluid py-1">
        <div className="py-2">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-secondary text-uppercase">Our Services</h6>
            <h1 className="mb-5">Forwarding Your Future</h1>
          </div>
          <div
            className="row g-4 rounded-4 pb-4 pt-1 px-3"
            style={{ boxShadow: "0px 0px 20px #0000001a" }}
          >
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>

      {/* our client section  */}
      {/* <Testimonial /> */}
      {/* Footer  */}
      <Footer />
    </>
  );
}
