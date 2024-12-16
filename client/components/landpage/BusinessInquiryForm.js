import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { submitBusinessInquiry } from "@/lib/api/business-inquiry";
export default function BusinessInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PersonalEmail1: "",
    PersonalMobile1: "",
    InterestedInName: "",
    Remarks: "",
    EstimatedRevenue: "",
    LeadSourceName: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitBusinessInquiry(formData);
      setResponseMessage("Business inquiry submitted successfully!");
      setLoading(false);
      setErrorMessage(null);
      setFormData({
        FirstName: "",
        LastName: "",
        PersonalEmail1: "",
        PersonalMobile1: "",
        InterestedInName: "",
        Remarks: "",
        EstimatedRevenue: "",
        LeadSourceName: "",
      });
    } catch (error) {
      setErrorMessage(
        "Failed to submit business inquiry. Please try again later."
      );
      setResponseMessage(null);
      console.error("Error submitting business inquiry:", error);
      setLoading(false);
    }
  };
  const address =
    "7 Grove Avenue, Acocks Green, Birmingham. B27 7UY, United Kingdom";
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  return (
    <div className="container-fluid py-1">
      <div className="contactsec  py-5 mb-4 rounded-4">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <h6 className="text-secondary text-uppercase mb-3">Get In Touch</h6>
            <h1 className="mb-2">Contact Us</h1>
            <p className="mb-4">
              Ready to transform your supply chain operations? Contact us today
              to learn more about our services and how we can help your business
              achieve its goals.
            </p>
            <div className="">
              <div className="fs-5">
                <Link href="tel:+447459041500" passHref>
                  <i className="bi bi-telephone-fill fs-5 text-primary me-2"></i>
                  +44 745 904 1500
                </Link>
              </div>
              <div className="fs-5 mt-3">
                <Link href="mailto:info@i-scs.co.uk" passHref>
                  <i className="bi bi-envelope-check-fill fs-5 text-primary me-2"></i>
                  info@i-scs.co.uk
                </Link>
              </div>
              <div className="fs-5 mt-3">
                <Link
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  passHref
                >
                  <i className="bi bi-geo-alt-fill fs-5 text-primary me-2"></i>
                  {address}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="bg-light text-center p-5 rounded-4">
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="email"
                      name="PersonalEmail1"
                      value={formData.PersonalEmail1}
                      onChange={handleChange}
                      placeholder="Personal Email"
                      required
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      name="PersonalMobile1"
                      value={formData.PersonalMobile1}
                      onChange={handleChange}
                      placeholder="Personal Mobile"
                      required
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="number"
                      name="EstimatedRevenue"
                      value={formData.EstimatedRevenue}
                      onChange={handleChange}
                      placeholder="Estimated Revenue"
                      required
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select border-0 rounded-3"
                      style={{ height: "55px" }}
                      name="InterestedInName"
                      value={formData.InterestedInName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select A Freight</option>
                      <option value="Air Freight">Air Freight</option>
                      <option value="Ocean Freight">Ocean Freight</option>
                      <option value="Road Freight">Road Freight</option>
                      <option value="Hazardous or Dangerous Goods Cargo Handling">
                        Hazardous or Dangerous Goods Cargo Handling
                      </option>
                      <option value="Customs Clearance">
                        Customs Clearance
                      </option>
                      <option value="Innovations">Innovations</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <textarea
                      name="Remarks"
                      value={formData.Remarks}
                      onChange={handleChange}
                      placeholder="Remarks"
                      required
                      className="form-control border-0 rounded-3"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="LeadSourceName"
                      value={formData.LeadSourceName}
                      onChange={handleChange}
                      placeholder="Lead Source"
                      required
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3 rounded-5"
                      type="submit"
                    >
                      {loading && (
                        <span>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Loading...
                        </span>
                      )}{" "}
                      {!loading && "Submit"}
                    </button>
                  </div>
                </div>
              </form>

              {responseMessage && (
                <p className=" text-success">{responseMessage}</p>
              )}
              {errorMessage && <p className=" text-danger">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
