"use client";
import { useState } from "react";
import axios from "axios";
import postcontactform from "@/utils/apiRoutes";

import Navbar from "@/components/landpage/Navbar";
import Hero from "@/components/landpage/Hero";
import About from "@/components/landpage/About";
import Facts from "@/components/landpage/Facts";

import Whychoose from "@/components/landpage/Whychoose";
import Pricing from "@/components/landpage/Pricing";
import OurTeam from "@/components/landpage/OurTeam";
import Testimonial from "@/components/landpage/Testimonial";
import Footer from "@/components/landpage/Footer";

import { Carousel } from "react-bootstrap";
import Hero2 from "@/components/landpage/Hero2";
import Hero3 from "@/components/landpage/Hero3";
import Contact from "@/components/landpage/Contact";
import ServiceItem from "@/components/landpage/ServiceItem";
import services from "@/data/servicesData";
import BusinessInquiryForm from "@/components/landpage/BusinessInquiryForm";
import Tariff from "@/components/landpage/Tariff";
import Hero4 from "@/components/landpage/Hero4";
// import SearatesWidget from "@/components/searates/SearatesWidget";

export default function Home() {
  const hostn = process.env.API_URL;

  return (
    <>
      <Navbar />
      <Carousel fade className="homeslider mt-4">
        <Carousel.Item>
          <Hero />
        </Carousel.Item>
        <Carousel.Item>
          <Hero2 />
        </Carousel.Item>
        <Carousel.Item>
          <Hero3 />
        </Carousel.Item>
        <Carousel.Item>
          <Hero4 />
        </Carousel.Item>
      </Carousel>

      <About />
      {/* <Facts/> */}
      <div className="container-fluid">
        <div
          className="row g-4 rounded-4 pb-4 pt-1 px-3"
          style={{ boxShadow: "0px 0px 20px #0000001a" }}
        >
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
      <Whychoose />
      {/* <Pricing /> */}
      {/* <Contact /> */}
      <BusinessInquiryForm />
      {/* <OurTeam/> */}
      {/* <Testimonial/> */}
      <Footer />
    </>
  );
}
