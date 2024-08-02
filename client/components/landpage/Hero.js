import React from "react";

const Hero = () => {
  return (
    <div className="container-fluid p-0 ">
      <div className="header-carousel position-relative rounded-4 overflow-hidden">
        <div className="position-relative">
          <img
            className="img-fluid"
            src="/img/carosel-1.png"
            alt="Carousel Image"
            style={{ objectFit: "cover" }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center ">
            <div className="container h-100">
              <div className="row justify-content-start h-100">
                <div className="col-10 col-lg-8">
                  <div className="sliderCont d-flex flex-column justify-content-around h-100">
                    <h1 className="display-3 text-white animated slideInDown mb-4">
                      Integrated Supply Chain Solutions Limited
                      {/* <span className="text-primary">(ISCS)</span> */}
                    </h1>

                    <div>
                      <a
                        href="#"
                        className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft rounded-5"
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="btn btn-secondary py-md-3 px-md-5 animated slideInRight rounded-5"
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
      </div>
    </div>
  );
};

export default Hero;
