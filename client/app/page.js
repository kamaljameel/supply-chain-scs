"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-grow text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div> */}

      <nav class="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
        <a
          href="/"
          class="navbar-brand  d-flex align-items-center px-4 px-lg-5"
        >
           <img src="./img/logois.svg" className="logo" alt="logo" />

        </a>
        <button
          type="button"
          class="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto p-4 p-lg-0 align-items-center">
            <a href="index.html" class="nav-item nav-link active">
              Home
            </a>
            <a href="about.html" class="nav-item nav-link">
              About
            </a>
            <a href="service.html" class="nav-item nav-link">
              Services
            </a>
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div class="dropdown-menu fade-up m-0">
                <a href="price.html" class="dropdown-item">
                  Pricing Plan
                </a>
                <a href="feature.html" class="dropdown-item">
                  Features
                </a>
                <a href="quote.html" class="dropdown-item">
                  Free Quote
                </a>
                <a href="team.html" class="dropdown-item">
                  Our Team
                </a>
                <a href="testimonial.html" class="dropdown-item">
                  Testimonial
                </a>
                <a href="404.html" class="dropdown-item">
                  404 Page
                </a>
              </div>
            </div>

            <h4 class="m-0 pe-lg-5 d-none d-lg-block"><i class="bi bi-headphones text-primary me-2"></i>+44 7459 041500</h4>
        </div>
        </div>
      </nav>

      <div class="container-fluid p-0 pb-5">
        <div class="owl-carousel header-carousel position-relative mb-5">
          <div class="owl-carousel-item position-relative">
            <img class="img-fluid" src="img/carousel-1.jpg" alt="" />
            <div
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: " rgba(6, 3, 21, .5)" }}
            >
              <div class="container">
                <div class="row justify-content-start">
                  <div class="col-10 col-lg-8">
                    {/* <h5 class="text-white text-uppercase mb-3 animated slideInDown">
                      Transport & Logistics Solution
                    </h5> */}
                    <h1 class="display-3 text-white animated slideInDown mb-4">
                    Integrated Supply Chain Solutions Limited
                      <span class="text-primary">(ISCS)</span>
                    </h1>
                    <p class="fs-5 fw-medium text-white mb-4 pb-2 home-page">
                      Welcome to Integrated Supply Chain Solutions Limited
                      (ISCS). We are a leading provider of innovative supply
                      chain solutions designed to enhance efficiency,
                      visibility, and control for businesses of all sizes. With
                      a commitment to excellence and a focus on cutting-edge
                      technology, we deliver comprehensive services that
                      streamline operations and drive growth.
                    </p>
                    <a
                      href=""
                      class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Read More
                    </a>
                    <a
                      href=""
                      class="btn btn-secondary py-md-3 px-md-5 animated slideInRight"
                    >
                      Free Quote
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="owl-carousel-item position-relative">
                <img class="img-fluid" src="img/carousel-2.jpg" alt=""/>
                <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{background: 'rgba(6, 3, 21, .5)'}}>
                    <div class="container">
                        <div class="row justify-content-start">
                            <div class="col-10 col-lg-8">
                                <h5 class="text-white text-uppercase mb-3 animated slideInDown">Transport & Logistics Solution</h5>
                                <h1 class="display-3 text-white animated slideInDown mb-4">#1 Place For Your <span class="text-primary">Transport</span> Solution</h1>
                                <p class="fs-5 fw-medium text-white mb-4 pb-2">Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.</p>
                                <a href="" class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Read More</a>
                                <a href="" class="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Free Quote</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
      </div>

      <div class="container-fluid overflow-hidden py-5 px-lg-0">
        <div class="container about py-5 px-lg-0">
          <div class="row g-5 mx-lg-0">
            <div
              class="col-lg-6 ps-lg-0 wow fadeInLeft"
              data-wow-delay="0.1s"
              style={{ minHeight: " 400px" }}
            >
              <div class="position-relative h-100">
                <img
                  class="position-absolute img-fluid w-100 h-100"
                  src="img/about.jpg"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
            <div class="col-lg-6 about-text wow fadeInUp" data-wow-delay="0.3s">
              <h6 class="text-secondary text-uppercase mb-3">About Us</h6>
              <h1 class="mb-5">Quick Transport and Logistics Solutions</h1>
              <p class="mb-5">
                At ISCS, we understand the complexities of modern supply chains.
                Our mission is to simplify and optimize these processes for our
                clients, ensuring seamless end-to-end connectivity. With over
                100 years of combined industry experience, our team is dedicated
                to delivering solutions that are both innovative and scalable.
                We pride ourselves on our customer-centric approach, ensuring
                that each solution is tailored to meet the unique needs of our
                clients.
              </p>
              <div class="row g-4 mb-5">
                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                  <i class="fa fa-globe fa-3x text-primary mb-3"></i>
                  <h5>Global Coverage</h5>
                  <p class="m-0">
                    We pride ourselves on our customer-centric approach,
                    ensuring that each solution is tailored to meet the unique
                    needs of our clients.
                  </p>
                </div>
                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                  <i class="fa fa-shipping-fast fa-3x text-primary mb-3"></i>
                  <h5>On Time Delivery</h5>
                  <p class="m-0">
                    Our mission is to simplify and optimize these processes for
                    our clients, ensuring seamless end-to-end connectivity.
                  </p>
                </div>
              </div>
              <a href="" class="btn btn-primary py-3 px-5">
                Explore More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5">
        <div class="container py-5">
          <div class="row g-5">
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h6 class="text-secondary text-uppercase mb-3">Some Facts</h6>
              <h1 class="mb-5">#1 Place To Manage All Of Your Shipments</h1>
              <p class="mb-5">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div class="d-flex align-items-center">
                <i class="fa fa-headphones fa-2x flex-shrink-0 bg-primary p-3 text-white"></i>
                <div class="ps-4">
                  <h6>Call for any query!</h6>
                  <h3 class="text-primary m-0">07459041500</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row g-4 align-items-center">
                <div class="col-sm-6">
                  <div
                    class="bg-primary p-4 mb-4 wow fadeIn"
                    data-wow-delay="0.3s"
                  >
                    <i class="fa fa-users fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">
                      1234
                    </h2>
                    <p class="text-white mb-0">Happy Clients</p>
                  </div>
                  <div
                    class="bg-secondary p-4 wow fadeIn"
                    data-wow-delay="0.5s"
                  >
                    <i class="fa fa-ship fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">
                      1234
                    </h2>
                    <p class="text-white mb-0">Complete Shipments</p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="bg-success p-4 wow fadeIn" data-wow-delay="0.7s">
                    <i class="fa fa-star fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">
                      1234
                    </h2>
                    <p class="text-white mb-0">Customer Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5">
        <div class="container py-5">
          <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 class="text-secondary text-uppercase">Our Services</h6>
            <h1 class="mb-5">Explore Our Services</h1>
          </div>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div class="service-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/service-1.jpg" alt="" />
                </div>
                <h4 class="mb-3">Air Freight</h4>
                <p className="home-page">
                  To reduce costs on your freight movements, we consolidate
                  shipments with other customers and pass the savings on to you,
                  ensuring your products reach the market at the most
                  competitive price.
                </p>
                <a class="btn-slide mt-2" href="">
                  <i class="fa fa-arrow-right"></i>
                  <span>Read More</span>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
              <div class="service-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/service-2.jpg" alt="" />
                </div>
                <h4 class="mb-3">Ocean Freight</h4>
                <p className="home-page">
                  We integrated our platform with major shipping lines to offer
                  sea freight directly to our clients without adding our cut.
                  Our AI based system will let you compare and select route and
                  pricing solutions to your importing and exporting ...
                </p>
                <a class="btn-slide mt-2" href="">
                  <i class="fa fa-arrow-right"></i>
                  <span>Read More</span>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.7s">
              <div class="service-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/service-3.jpg" alt="" />
                </div>
                <h4 class="mb-3">Road Freight</h4>
                <p className="home-page">
                  We have partnered with various road transport companies to
                  offer vehicles of sizes and types that are safe and secure to
                  protect your cargo of all sizes during transit. We also
                  provide specialized services, including tail lift trucks,
                  crane lift for LCL and air freight cargo ...
                </p>
                <a class="btn-slide mt-2" href="">
                  <i class="fa fa-arrow-right"></i>
                  <span>Read More</span>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div class="service-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/service-4.jpg" alt="" />
                </div>
                <h4 class="mb-3">Hazardous or Dangerous Goods Cargo Handlin</h4>
                <p>
                  For hazardous cargo, we offer professional packing, dangerous
                  goods documentation, labeling, and freight forwarding to meet
                  all international and domestic regulations. We regularly
                  handle the international transportation of hazardous chemicals
                  and provide the best possible guidance based on UN numbers,
                  MSDS, and dangerous goods declarations.
                </p>
                <a class="btn-slide mt-2" href="">
                  <i class="fa fa-arrow-right"></i>
                  <span>Read More</span>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
              <div class="service-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/service-5.jpg" alt="" />
                </div>
                <h4 class="mb-3">Customs Clearance</h4>
                <p className="home-page">
                  We handle customs requirements for import or export
                  consignments, providing seamless customs clearance through our
                  electronic automation system to meet the ever-changing and
                  strict customs laws. We handle all documentation requirements
                  for the countries you are importing from and exporting ...
                </p>
                <a class="btn-slide mt-2" href="">
                  <i class="fa fa-arrow-right"></i>
                  <span>Read More</span>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.7s">
              <div class="service-item p-4">
                <div class="overflow-hidden mb-4">
                  <img class="img-fluid" src="img/service-6.jpg" alt="" />
                </div>
                <h4 class="mb-3">Innovations</h4>
                <p>
                  ISCS is at the forefront of supply chain innovation. Our
                  ongoing R&D efforts focus on developing new features such as
                  AI predictive analytics and mobile applications. We aim to
                  continuously improve our offerings to provide our clients with
                  the most advanced and efficient supply chain solutions
                  available.
                </p>
                <a class="btn-slide mt-2" href="">
                  <i class="fa fa-arrow-right"></i>
                  <span>Read More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid overflow-hidden py-5 px-lg-0">
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
          <div class="row g-5 align-items-center">
            <div class="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
              <h6 class="text-secondary text-uppercase mb-3">Get A Quote</h6>
              <h1 class="mb-5">Contact Us</h1>
              <p class="mb-5">
                Ready to transform your supply chain operations? Contact us
                today to learn more about our services and how we can help your
                business achieve its goals.
              </p>
              <div class="d-flex align-items-center">
                <i class="fa fa-headphones fa-2x flex-shrink-0 bg-primary p-3 text-white"></i>
                <div class="ps-4">
                  <h6>Call for any query!</h6>
                  <h3 class="text-primary m-0">07459041500</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <div
                class="bg-light text-center p-5 wow fadeIn"
                data-wow-delay="0.5s"
              >
                <form>
                  <div class="row g-3">
                    <div class="col-12 col-sm-6">
                      <input
                        type="text"
                        class="form-control border-0"
                        placeholder="Your Name"
                        style={{ height: "55px" }}
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <input
                        type="email"
                        class="form-control border-0"
                        placeholder="Your Email"
                        style={{ height: "55px" }}
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <input
                        type="text"
                        class="form-control border-0"
                        placeholder="Your Mobile"
                        style={{ height: "55px" }}
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <select
                        class="form-select border-0"
                        style={{ height: "55px" }}
                      >
                        <option selected>Select A Freight</option>
                        <option value="1">Freight 1</option>
                        <option value="2">Freight 2</option>
                        <option value="3">Freight 3</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <textarea
                        class="form-control border-0"
                        placeholder="Special Note"
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100 py-3" type="submit">
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
                <i class="fa fa-map-marker-alt"></i>7 Grove Avenue, Acocks Green, Birmingham. B27 7UY, United Kingdom.
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