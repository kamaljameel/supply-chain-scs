import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonial() {
  const CustomPrevArrow = (props) => (
    <div {...props} className="slick-arrow slick-prev">
      <div className="custom-icon">
        {/* Replace with your custom SVG or icon component */}
        <i className="bi bi-chevron-left fs-2 text-dark"></i>
      </div>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div {...props} className="slick-arrow slick-next">
      <i className="bi bi-chevron-right fs-2 text-dark"></i>
    </div>
  );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "0px",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className=" py-5">
        <div className="text-center">
          <h6 className="text-secondary text-uppercase">Testimonial</h6>
          <h1 className="mb-0">Our Clients Say!</h1>
        </div>
        <div
          className="owl-carousel testimonial-carousel wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <Slider {...settings} className="testimonial-slider">
            <div className="testimonial-item p-4 my-5">
              <i className="bi bi-chat-left-quote fs-1 text-light position-absolute top-0 end-0 mt-n4 me-4"></i>
              <div className="d-flex align-items-end mb-4">
                <img
                  className="img-fluid flex-shrink-0"
                  src="img/testimonial-1.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div className="ms-4">
                  <h5 className="mb-1">Client Name</h5>
                  <p className="m-0">Profession</p>
                </div>
              </div>
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
            <div className="testimonial-item p-4 my-5">
              <i className="bi bi-chat-left-quote fs-1 text-light position-absolute top-0 end-0 mt-n4 me-4"></i>
              <div className="d-flex align-items-end mb-4">
                <img
                  className="img-fluid flex-shrink-0"
                  src="img/testimonial-2.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div className="ms-4">
                  <h5 className="mb-1">Client Name</h5>
                  <p className="m-0">Profession</p>
                </div>
              </div>
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
            <div className="testimonial-item p-4 my-5">
              <i className="bi bi-chat-left-quote fs-1 text-light position-absolute top-0 end-0 mt-n4 me-4"></i>
              <div className="d-flex align-items-end mb-4">
                <img
                  className="img-fluid flex-shrink-0"
                  src="img/testimonial-3.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div className="ms-4">
                  <h5 className="mb-1">Client Name</h5>
                  <p className="m-0">Profession</p>
                </div>
              </div>
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
            <div className="testimonial-item p-4 my-5">
              <i className="bi bi-chat-left-quote fs-1 text-light position-absolute top-0 end-0 mt-n4 me-4"></i>
              <div className="d-flex align-items-end mb-4">
                <img
                  className="img-fluid flex-shrink-0"
                  src="img/testimonial-4.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div className="ms-4">
                  <h5 className="mb-1">Client Name</h5>
                  <p className="m-0">Profession</p>
                </div>
              </div>
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
