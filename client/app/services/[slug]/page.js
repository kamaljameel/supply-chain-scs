"use client";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import services from "@/data/servicesData";
import Navbar from "@/components/landpage/Navbar";
import Footer from "@/components/landpage/Footer";
import Contact from "@/components/landpage/Contact";

const ServiceDetails = ({ params }) => {
  const { slug } = params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <div>Service not found</div>;
  }
  const backgroundImage = service.imageSrc
    ? `linear-gradient(rgba(6, 3, 21, 0.5), rgba(6, 3, 21, 0.5)), url(${service.imageSrc}) center center / cover no-repeat`
    : "linear-gradient(rgba(6, 3, 21, 0.5), rgba(6, 3, 21, 0.5))";
  return (
    <>
      <Navbar />
      <div
        class="container-fluid page-header py-5 mb-3"
        style={{
          marginBottom: "6rem",
          background: backgroundImage,
        }}
      >
        <div class="container py-5">
          <h1 class="display-3 text-white mb-3 animated slideInDown">
            {service.title}
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
                  Services
                </a>
              </li>
              <li class="breadcrumb-item text-white active" aria-current="page">
                {params.slug}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container">
        <div className="service-details">
          <p className="fs-4 py-3">{service.fullDescription}</p>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
};
export default ServiceDetails;
