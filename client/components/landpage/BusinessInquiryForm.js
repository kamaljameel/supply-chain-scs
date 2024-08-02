import Link from "next/link";
import React from "react";
import { useState } from "react";

import { submitBusinessInquiry } from "@/lib/api/business-inquiry";
export default function BusinessInquiryForm() {
  const [formData, setFormData] = useState({
    BusinessName: "",
    FirstName: "",
    OfficialEmail: "",
    PersonalMobile1: "",
    InquiryLine: "",
    Description: "",
    InterestedInName: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitBusinessInquiry(formData);
      setResponseMessage("Business inquiry submitted successfully!");
      setErrorMessage(null);
      setFormData({
        BusinessName: "",
        FirstName: "",
        OfficialEmail: "",
        PersonalMobile1: "",
        InquiryLine: "",
        Description: "",
        InterestedInName: "",
      });
    } catch (error) {
      setErrorMessage(
        "Failed to submit business inquiry. Please try again later."
      );
      setResponseMessage(null);
      console.error("Error submitting business inquiry:", error);
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
                      name="BusinessName"
                      value={formData.BusinessName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="form-control border-0 rounded-3"
                      style={{ height: "55px" }}
                    />
                  </div>
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
                      type="email"
                      name="OfficialEmail"
                      value={formData.OfficialEmail}
                      onChange={handleChange}
                      placeholder="Official Email"
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
                      type="text"
                      name="InquiryLine"
                      value={formData.InquiryLine}
                      onChange={handleChange}
                      placeholder="Inquiry Line"
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
                      name="Description"
                      value={formData.Description}
                      onChange={handleChange}
                      placeholder="Description"
                      required
                      className="form-control border-0 rounded-3"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3 rounded-5"
                      type="submit"
                    >
                      Submit
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
