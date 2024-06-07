import React from 'react'

const Hero = () => {
  return (
    <div className="container-fluid p-0 pb-5">
    <div className="header-carousel position-relative mb-5">
      <div className="position-relative">
        <img
          className="img-fluid"
          src="/img/carousel-1.jpg"
          alt="Carousel Image"
          layout="fill"
          objectFit="cover"
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
          style={{ background: "rgba(6, 3, 21, .5)" }}
        >
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-10 col-lg-8">
                <h1 className="display-3 text-white animated slideInDown mb-4">
                  Integrated Supply Chain Solutions Limited
                  <span className="text-primary">(ISCS)</span>
                </h1>
                <p className="fs-5 fw-medium text-white mb-4 pb-2 home-page">
                  Welcome to Integrated Supply Chain Solutions Limited
                  (ISCS). We are a leading provider of innovative supply
                  chain solutions designed to enhance efficiency,
                  visibility, and control for businesses of all sizes. With
                  a commitment to excellence and a focus on cutting-edge
                  technology, we deliver comprehensive services that
                  streamline operations and drive growth.
                </p>
                <a
                  href="#"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Read More
                </a>
                <a
                  href="#"
                  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                >
                  Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Hero;
