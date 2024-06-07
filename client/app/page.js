"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import postcontactform from "@/utils/apiRoutes";
import Navbar from "@/components/landpage/Navbar";
import Hero from "@/components/landpage/Hero";
import About from "@/components/landpage/About";
import Facts from "@/components/landpage/Facts";
import Services from "@/components/landpage/Services";
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    // freight: '',
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(postcontactform, {
        name: formData.name,
        email: formData.email,
        address: formData.mobile, // Assuming 'address' refers to 'mobile' here
        notes: formData.notes,
      });
      alert("Form submitted successfully: " + response.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Sorry, it’s not registered");
    }
  };
  return (
    <>
      <Navbar />
      <Hero/>
      <About/>
      <Facts/>
      <Services/>
      {/* <div class="container-fluid overflow-hidden py-5 px-lg-0">
        <div class="container feature py-5 px-lg-0">
          <div class="row g-5 mx-lg-0">
            <div
              class="col-lg-6 feature-text wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h6 class="text-secondary text-uppercase mb-3">Our Features</h6>
              <h1 class="mb-5">Why Choose ISCS </h1>
              <div class="d-flex mb-5 wow fadeInUp" data-wow-delay="0.3s">
                <i class="fa fa-globe text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Expertise and Experience</h5>
                  <p class="mb-0">
                    Our team brings over a century of combined experience in the
                    supply chain industry, ensuring that we understand and can
                    meet the diverse needs of our clients.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeIn" data-wow-delay="0.5s">
                <i class="fa fa-shipping-fast text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Customer-Centric Approach</h5>
                  <p class="mb-0">
                    We prioritize our clients’ needs, offering personalized
                    solutions and dedicated support to ensure their success.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeInUp" data-wow-delay="0.7s">
                <i class="fa fa-headphones text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Cutting-Edge Technology</h5>
                  <p class="mb-0">
                    Our platform utilizes the latest technologies to provide
                    real-time visibility, predictive analytics, and seamless
                    integration with existing systems.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeIn" data-wow-delay="0.5s">
                <i class="fa fa-shipping-fast text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Scalability</h5>
                  <p class="mb-0">
                    Our solutions are designed to grow with your business,
                    offering modular features that can be expanded and
                    customized as needed.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeIn" data-wow-delay="0.5s">
                <i class="fa fa-shipping-fast text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Supply Chain Management</h5>
                  <p class="mb-0">
                    Our comprehensive supply chain management services ensure
                    optimal performance and efficiency. From inventory control
                    to logistics planning, we cover every aspect of the supply
                    chain
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeIn" data-wow-delay="0.5s">
                <i class="fa fa-shipping-fast text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Real-Time Analytics</h5>
                  <p class="mb-0">
                    Utilize our advanced real-time analytics to gain actionable
                    insights and make proactive decisions. Our platform offers
                    detailed visibility into your supply chain operations.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeIn" data-wow-delay="0.5s">
                <i class="fa fa-shipping-fast text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>AI and Predictive Analytics</h5>
                  <p class="mb-0">
                    Leverage our AI-driven predictive analytics to anticipate
                    disruptions, optimize inventory levels, and improve overall
                    supply chain resilience.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-5 wow fadeIn" data-wow-delay="0.5s">
                <i class="fa fa-shipping-fast text-primary fa-3x flex-shrink-0"></i>
                <div class="ms-4">
                  <h5>Custom Solutions</h5>
                  <p class="mb-0">
                    We offer fully customizable solutions that integrate with
                    your existing systems, eliminating data silos and enhancing
                    operational visibility.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-lg-6 pe-lg-0 wow fadeInRight"
              data-wow-delay="0.1s"
              style={{ minHeight: " 400px" }}
            >
              <div class="position-relative h-100">
                <img
                  class="position-absolute img-fluid w-100 h-100"
                  src="img/feature.jpg"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
       <div className="container-fluid overflow-hidden py-5 px-lg-0">
      <div className="container feature py-5 px-lg-0">
        <div className="row g-5 mx-lg-0">
          <div className="col-lg-6 feature-text wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-secondary text-uppercase mb-3">Our Features</h6>
            <h1 className="mb-5">Why Choose ISCS </h1>
            <div className="d-flex mb-5 wow fadeInUp" data-wow-delay="0.3s">
              <i className="fa fa-globe text-primary fa-3x flex-shrink-0"></i>
              <div className="ms-4">
                <h5>Expertise and Experience</h5>
                <p className="mb-0">
                  Our team brings over a century of combined experience in the
                  supply chain industry, ensuring that we understand and can
                  meet the diverse needs of our clients.
                </p>
              </div>
            </div>
            {/* Rest of your content */}
          </div>
          <div className="col-lg-6 pe-lg-0 wow fadeInRight" data-wow-delay="0.1s" style={{ minHeight: " 400px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute img-fluid w-100 h-100"
                src="img/feature.jpg"
                style={{ objectFit: "cover" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="container-xxl py-5">
        <div class="container py-5">
          <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 class="text-secondary text-uppercase">Pricing Plan</h6>
            <h1 class="mb-5">Perfect Pricing Plan</h1>
          </div>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div class="price-item">
                <div class="border-bottom p-4 mb-4">
                  <h5 class="text-primary mb-1">Basic Plan</h5>
                  <h1 class="display-5 mb-0">
                    {/* <small class="align-top" style={{fontSize: '22px', lineHeight: '45px'}}>$</small>49.00<small
                                    class="align-bottom" style={{fontSize: '16px', lineHeight: '40px'}}>/ Month</small> */}
                  </h1>
                </div>
                <div class="p-4 pt-0">
                  <p>
                    <i class="fa fa-check text-success me-3"></i>HTML5 & CSS3
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Bootstrap v5
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>FontAwesome
                    Icons
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Responsive
                    Layout
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Cross-browser
                    Support
                  </p>
                  <a class="btn-slide mt-2" href="">
                    <i class="fa fa-arrow-right"></i>
                    <span>Order Now</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
              <div class="price-item">
                <div class="border-bottom p-4 mb-4">
                  <h5 class="text-primary mb-1">Standard Plan</h5>
                  <h1 class="display-5 mb-0">
                    {/* <small class="align-top" style={{fontSize: '22px', lineHeight: '45px'}}>$</small>99.00<small>
                                    class="align-bottom" style={{fontSize: '16px', lineHeight: '40px'}}/ Month</small> */}
                  </h1>
                </div>
                <div class="p-4 pt-0">
                  <p>
                    <i class="fa fa-check text-success me-3"></i>HTML5 & CSS3
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Bootstrap v5
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>FontAwesome
                    Icons
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Responsive
                    Layout
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Cross-browser
                    Support
                  </p>
                  <a class="btn-slide mt-2" href="">
                    <i class="fa fa-arrow-right"></i>
                    <span>Order Now</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.7s">
              <div class="price-item">
                <div class="border-bottom p-4 mb-4">
                  <h5 class="text-primary mb-1">Advanced Plan</h5>
                  <h1 class="display-5 mb-0">
                    {/* <small class="align-top" style={{fontSize: '22px', lineHeight: '45px'}}>$</small>149.00<small
                                    class="align-bottom" style={{fontSize: '16px', lineHeight: '40px'}}>/ Month</small> */}
                  </h1>
                </div>
                <div class="p-4 pt-0">
                  <p>
                    <i class="fa fa-check text-success me-3"></i>HTML5 & CSS3
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Bootstrap v5
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>FontAwesome
                    Icons
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Responsive
                    Layout
                  </p>
                  <p>
                    <i class="fa fa-check text-success me-3"></i>Cross-browser
                    Support
                  </p>
                  <a class="btn-slide mt-2" href="">
                    <i class="fa fa-arrow-right"></i>
                    <span>Order Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5">
        <div class="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <h6 className="text-secondary text-uppercase mb-3">
                Get A Quote
              </h6>
              <h1 className="mb-5">Contact Us</h1>
              <p className="mb-5">
                Ready to transform your supply chain operations? Contact us
                today to learn more about our services and how we can help your
                business achieve its goals.
              </p>
              <div className="d-flex align-items-center">
                <i className="fa fa-headphones fa-2x flex-shrink-0 bg-primary p-3 text-white"></i>
                <div className="ps-4">
                  <h6>Call for any query!</h6>
                  <h3 className="text-primary m-0">07459041500</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="bg-light text-center p-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ height: "55px" }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="email"
                        className="form-control border-0"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ height: "55px" }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        style={{ height: "55px" }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select border-0"
                        name="freight"
                        value={formData.freight}
                        onChange={handleChange}
                        style={{ height: "55px" }}
                      >
                        <option value="" selected>
                          Select A Freight
                        </option>
                        <option value="Freight 1">Freight 1</option>
                        <option value="Freight 2">Freight 2</option>
                        <option value="Freight 3">Freight 3</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control border-0"
                        placeholder="Special Note"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5">
        <div class="container py-5">
          <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 class="text-secondary text-uppercase">Our Team</h6>
            <h1 class="mb-5">Expert Team Members</h1>
          </div>
          <div class="row g-4">
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div class="team-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/team-1.jpg" alt="" />
                </div>
                <h5 class="mb-0">Full Name</h5>
                <p>Designation</p>
                <div class="btn-slide mt-1">
                  <i class="fa fa-share"></i>
                  <span>
                    <a href="">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div class="team-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/team-2.jpg" alt="" />
                </div>
                <h5 class="mb-0">Full Name</h5>
                <p>Designation</p>
                <div class="btn-slide mt-1">
                  <i class="fa fa-share"></i>
                  <span>
                    <a href="">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div class="team-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/team-3.jpg" alt="" />
                </div>
                <h5 class="mb-0">Full Name</h5>
                <p>Designation</p>
                <div class="btn-slide mt-1">
                  <i class="fa fa-share"></i>
                  <span>
                    <a href="">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.9s">
              <div class="team-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/team-4.jpg" alt="" />
                </div>
                <h5 class="mb-0">Full Name</h5>
                <p>Designation</p>
                <div class="btn-slide mt-1">
                  <i class="fa fa-share"></i>
                  <span>
                    <a href="">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
          <div class="text-center">
            <h6 class="text-secondary text-uppercase">Testimonial</h6>
            <h1 class="mb-0">Our Clients Say!</h1>
          </div>
          <div
            class="owl-carousel testimonial-carousel wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div class="testimonial-item p-4 my-5">
              <i class="fa fa-quote-right fa-3x text-light position-absolute top-0 end-0 mt-n3 me-4"></i>
              <div class="d-flex align-items-end mb-4">
                <img
                  class="img-fluid flex-shrink-0"
                  src="img/testimonial-1.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div class="ms-4">
                  <h5 class="mb-1">Client Name</h5>
                  <p class="m-0">Profession</p>
                </div>
              </div>
              <p class="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
            <div class="testimonial-item p-4 my-5">
              <i class="fa fa-quote-right fa-3x text-light position-absolute top-0 end-0 mt-n3 me-4"></i>
              <div class="d-flex align-items-end mb-4">
                <img
                  class="img-fluid flex-shrink-0"
                  src="img/testimonial-2.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div class="ms-4">
                  <h5 class="mb-1">Client Name</h5>
                  <p class="m-0">Profession</p>
                </div>
              </div>
              <p class="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
            <div class="testimonial-item p-4 my-5">
              <i class="fa fa-quote-right fa-3x text-light position-absolute top-0 end-0 mt-n3 me-4"></i>
              <div class="d-flex align-items-end mb-4">
                <img
                  class="img-fluid flex-shrink-0"
                  src="img/testimonial-3.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div class="ms-4">
                  <h5 class="mb-1">Client Name</h5>
                  <p class="m-0">Profession</p>
                </div>
              </div>
              <p class="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
            <div class="testimonial-item p-4 my-5">
              <i class="fa fa-quote-right fa-3x text-light position-absolute top-0 end-0 mt-n3 me-4"></i>
              <div class="d-flex align-items-end mb-4">
                <img
                  class="img-fluid flex-shrink-0"
                  src="img/testimonial-4.jpg"
                  style={{ width: "80px", height: " 80px" }}
                />
                <div class="ms-4">
                  <h5 class="mb-1">Client Name</h5>
                  <p class="m-0">Profession</p>
                </div>
              </div>
              <p class="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="container-fluid bg-dark text-light footer pt-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ marginTop: "6rem" }}
      >
        <div class="container py-5">
          <div class="row g-5">
            <div class="col-lg-3 col-md-6">
              <h4 class="text-light mb-4">Address</h4>
              <p class="mb-2">
                <i class="fa fa-map-marker-alt"></i>7 Grove Avenue, Acocks
                Green, Birmingham. B27 7UY, United Kingdom.
              </p>
              <p class="mb-2">
                <i class="fa fa-phone-alt "></i>074590415000
              </p>
              <p class="mb-2">
                <i class="fa fa-envelope "></i>info@i-scs.co.uk
              </p>
              <div class="d-flex pt-2">
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-twitter"></i>
                </a>
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <h4 class="text-light mb-4">Services</h4>
              <a class="btn btn-link" href="">
                Air Freight
              </a>
              <a class="btn btn-link" href="">
                Sea Freight
              </a>
              <a class="btn btn-link" href="">
                Road Freight
              </a>
              <a class="btn btn-link" href="">
                Logistic Solutions
              </a>
              <a class="btn btn-link" href="">
                Industry solutions
              </a>
            </div>
            <div class="col-lg-3 col-md-6">
              <h4 class="text-light mb-4">Quick Links</h4>
              <a class="btn btn-link" href="">
                About Us
              </a>
              <a class="btn btn-link" href="">
                Contact Us
              </a>
              <a class="btn btn-link" href="">
                Our Services
              </a>
              <a class="btn btn-link" href="">
                Terms & Condition
              </a>
              <a class="btn btn-link" href="">
                Support
              </a>
            </div>
            <div class="col-lg-3 col-md-6">
              <h4 class="text-light mb-4">Newsletter</h4>
              <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
              <div
                class="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <input
                  class="form-control border-0 w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="copyright">
            <div class="row">
              <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <a class="border-bottom" href="#">
                  Your Site Name
                </a>
                , All Right Reserved.
              </div>
              <div class="col-md-6 text-center text-md-end">
                Designed By{" "}
                <a class="border-bottom" href="$">
                  Kamal
                </a>
                <br />
                Distributed By{" "}
                <a class="border-bottom" href="$" target="_blank">
                  Demo Project for Supply Chain
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
