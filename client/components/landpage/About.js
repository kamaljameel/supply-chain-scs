import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <div className="container-fluid overflow-hidden py-1 px-lg-0">
      <div className="container about py-5 px-lg-0">
        <div className="row g-5 mx-lg-0">
          <div
            className="col-lg-6 ps-lg-0 wow fadeInLeft"
            data-wow-delay="0.1s"
            style={{ minHeight: "400px" }}
          >
            <div className="position-relative h-100">
              <Image
                className="position-absolute img-fluid w-100 h-100 imground"
                src="/img/pack.png"
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
            <h1 className="mb-5">Transporting Trust, Delivering Excellence</h1>
            <p className="mb-5">
              At ISCS, we navigate the complexities of modern supply chains with
              ease. Our mission is to simplify and optimize these processes for
              our clients, ensuring seamless end-to-end connectivity. With years
              of combined industry experience, our dedicated team delivers
              solutions that are both innovative and scalable. We pride
              ourselves on our customer-centric approach, tailoring each
              solution to meet the unique needs of our clients.
            </p>

            <a href="#" className="btn btn-primary py-3 px-5 rounded-5">
              Explore More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
