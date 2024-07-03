import Link from "next/link";
import React from "react";

export default function Footer() {
  const address =
    "7 Grove Avenue, Acocks Green, Birmingham. B27 7UY, United Kingdom";
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <div className="container-fluid pb-4 ">
      <div
        className=" bg-dark text-light footer pt-5 wow fadeIn rounded-4"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Address</h4>
              <p className="mb-2">
                <Link
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  passHref
                >
                  <i className="bi bi-geo-alt-fill  text-white me-2"></i>
                  {address}
                </Link>
              </p>
              <p className="mb-2">
                <Link href="tel:+447459041500" className="text-white" passHref>
                  <i className="bi bi-telephone-fill  text-white me-2"></i>
                  +44 745 904 1500
                </Link>
              </p>
              <p className="mb-2">
                <Link
                  href="mailto:info@i-scs.co.uk"
                  className="text-white"
                  passHref
                >
                  <i className="bi bi-envelope-check-fill  text-white me-2"></i>
                  info@i-scs.co.uk
                </Link>
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Services</h4>
              <Link className="btn btn-link" href="#" passHref>
                Air Freight
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Sea Freight
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Road Freight
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Logistic Solutions
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Industry solutions
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <Link className="btn btn-link" href="#" passHref>
                About Us
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Contact Us
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Our Services
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Terms & Condition
              </Link>
              <Link className="btn btn-link" href="#" passHref>
                Support
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Follow Us</h4>
              <p>
                Stay connected with us on social media for the latest updates
                and insights into supply chain management.
              </p>
              <div className="d-flex pt-2">
                <Link
                  className="btn btn-outline-light btn-social"
                  href="#"
                  passHref
                >
                  <i className="bi bi-twitter-x"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" href="#">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link
                  className="btn btn-outline-light btn-social"
                  href="#"
                  passHref
                >
                  <i className="bi bi-youtube"></i>
                </Link>
                <Link
                  className="btn btn-outline-light btn-social"
                  href="#"
                  passHref
                >
                  <i className="bi bi-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <Link className="border-bottom" href="/" passHref>
                  Integrated Supply Chain Solutions Limited (ISCS)
                </Link>
                , All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                ISCS: Your Gateway to Supply Chain Excellence
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
