import React from "react";

export default function Whychoose() {
  return (
    <div className="container-fluid overflow-hidden py-3 px-lg-0 ">
      <div
        className=" feature py-4 px-1 rounded-4"
        style={{ boxShadow: " 0px 0px 20px #0000001a" }}
      >
        <div className="row g-5 mx-lg-0 my-auto">
          <div className="col-lg-6 mt-0 wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-secondary text-uppercase mb-3">
              Safe, Secure, On Time – Every Time
            </h6>
            <h1 className="mb-5">Why Choose ISCS </h1>
            <div className="d-flex mb-5 wow fadeInUp" data-wow-delay="0.3s">
              <i className="fa fa-globe text-primary fa-3x flex-shrink-0"></i>
              <div className="ms-0">
                <h5>Expertise and Experience</h5>
                <p className="mb-0">
                  Our team brings over a century of combined experience in the
                  supply chain industry, ensuring that we understand and can
                  meet the diverse needs of our clients.
                </p>
                <h5 className="mt-3">Customer-Centric Approach</h5>
                <p className="mb-0">
                  We prioritize our clients’ needs, offering personalized
                  solutions and dedicated support to ensure their success.
                </p>

                <h5 className="mt-3">Cutting-Edge Technology</h5>
                <p className="mb-0">
                  Our platform utilizes the latest technologies to provide
                  real-time visibility, predictive analytics, and seamless
                  integration with existing systems.
                </p>

                <h5 className="mt-3">Scalability</h5>
                <p className="mb-0">
                  Our solutions are designed to grow with your business,
                  offering modular features that can be expanded and customized
                  as needed.
                </p>

                <h5 className="mt-3">Supply Chain Management</h5>
                <p className="mb-0">
                  Our comprehensive supply chain management services ensure
                  optimal performance and efficiency. From inventory control to
                  logistics planning, we cover every aspect of the supply chain.
                </p>

                <h5 className="mt-3">Real-Time Analytics</h5>
                <p className="mb-0">
                  Utilize our advanced real-time analytics to gain actionable
                  insights and make proactive decisions. Our platform offers
                  detailed visibility into your supply chain operations.
                </p>

                <h5 className="mt-3">AI and Predictive Analytics</h5>
                <p className="mb-0">
                  Leverage our AI-driven predictive analytics to anticipate
                  disruptions, optimize inventory levels, and improve overall
                  supply chain resilience.
                </p>

                <h5 className="mt-3">Custom Solutions</h5>
                <p className="mb-0">
                  We offer fully customizable solutions that integrate with your
                  existing systems, eliminating data silos and enhancing
                  operational visibility.
                </p>
              </div>
            </div>
            {/* Rest of your content */}
          </div>
          <div
            className="col-lg-6 mt-0 wow fadeInRight"
            data-wow-delay="0.1s"
            style={{ minHeight: " 400px" }}
          >
            <div className="position-relative h-100">
              <img
                className="position-absolute img-fluid w-100 h-100 imground"
                src="img/feature.jpg"
                style={{ objectFit: "cover" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
