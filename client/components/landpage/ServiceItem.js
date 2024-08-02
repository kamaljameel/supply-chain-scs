// components/ServiceItem.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ServiceItem = ({ service }) => {
  if (!service || !service.imageSrc) {
    return <div>No service data available</div>;
  }

  return (
    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
      <div className="service-item p-4">
        <div className="overflow-hidden mb-4">
          <Image
            className="img-fluid"
            src={service.imageSrc}
            width={400}
            height={300}
            alt={service.alt}
          />
        </div>
        <h4 className="mb-3">{service.title}</h4>
        <div className="d-flex flex-column justify-content-between">
          <p>{service.description}</p>
          <Link
            href={`/services/${service.slug}`}
            className="btn-slide mt-2"
            passHref
          >
            <i className="fa fa-arrow-right"></i>
            <span>Read More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
