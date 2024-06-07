import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <div className="container-fluid overflow-hidden py-5 px-lg-0">
      <div className="container about py-5 px-lg-0">
        <div className="row g-5 mx-lg-0">
          <div
            className="col-lg-6 ps-lg-0 wow fadeInLeft"
            data-wow-delay="0.1s"
            style={{ minHeight: "400px" }}
          >
            <div className="position-relative h-100">
              <Image
                className="position-absolute img-fluid w-100 h-100"
                src="/img/about.jpg"
                layout="fill"
                objectFit="cover"
                alt="About Us"
              />
            </div>
          </div>
          <div
            className="col-lg-6 about-text wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <h6 className="text-secondary text-uppercase mb-3">About Us</h6>
            <h1 className="mb-5">Quick Transport and Logistics Solutions</h1>
            <p className="mb-5">
              At ISCS, we understand the complexities of modern supply chains.
              Our mission is to simplify and optimize these processes for our
              clients, ensuring seamless end-to-end connectivity. With over 100
              years of combined industry experience, our team is dedicated to
              delivering solutions that are both innovative and scalable. We
              pride ourselves on our customer-centric approach, ensuring that
              each solution is tailored to meet the unique needs of our clients.
            </p>
            <div className="row g-4 mb-5">
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                <i className="fa fa-globe fa-3x text-primary mb-3"></i>
                <h5>Global Coverage</h5>
                <p className="m-0">
                  We pride ourselves on our customer-centric approach, ensuring
                  that each solution is tailored to meet the unique needs of our
                  clients.
                </p>
              </div>
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                <i className="fa fa-shipping-fast fa-3x text-primary mb-3"></i>
                <h5>On Time Delivery</h5>
                <p className="m-0">
                  Our mission is to simplify and optimize these processes for
                  our clients, ensuring seamless end-to-end connectivity.
                </p>
              </div>
            </div>
            <a href="#" className="btn btn-primary py-3 px-5">
              Explore More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
