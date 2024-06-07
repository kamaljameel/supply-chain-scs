import React from 'react'
import Image from 'next/image';
const Services = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container py-5">
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="text-secondary text-uppercase">Our Services</h6>
        <h1 className="mb-5">Explore Our Services</h1>
      </div>
      <div className="row g-4">
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item p-4">
            <div className="overflow-hidden mb-4">
              <Image className="img-fluid" src="/img/service-1.jpg" width={400} height={300} alt="Air Freight" />
            </div>
            <h4 className="mb-3">Air Freight</h4>
            <p className="home-page">
              To reduce costs on your freight movements, we consolidate
              shipments with other customers and pass the savings on to you,
              ensuring your products reach the market at the most
              competitive price.
            </p>
            <a className="btn-slide mt-2" href="#">
              <i className="fa fa-arrow-right"></i>
              <span>Read More</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item p-4">
            <div className="overflow-hidden mb-4">
              <Image className="img-fluid" src="/img/service-2.jpg" width={400} height={300} alt="Ocean Freight" />
            </div>
            <h4 className="mb-3">Ocean Freight</h4>
            <p className="home-page">
              We integrated our platform with major shipping lines to offer
              sea freight directly to our clients without adding our cut.
              Our AI based system will let you compare and select route and
              pricing solutions to your importing and exporting ...
            </p>
            <a className="btn-slide mt-2" href="#">
              <i className="fa fa-arrow-right"></i>
              <span>Read More</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.7s">
          <div className="service-item p-4">
            <div className="overflow-hidden mb-4">
              <Image className="img-fluid" src="/img/service-3.jpg" width={400} height={300} alt="Road Freight" />
            </div>
            <h4 className="mb-3">Road Freight</h4>
            <p className="home-page">
              We have partnered with various road transport companies to
              offer vehicles of sizes and types that are safe and secure to
              protect your cargo of all sizes during transit. We also
              provide specialized services, including tail lift trucks,
              crane lift for LCL and air freight cargo ...
            </p>
            <a className="btn-slide mt-2" href="#">
              <i className="fa fa-arrow-right"></i>
              <span>Read More</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item p-4">
            <div className="overflow-hidden mb-4">
              <Image className="img-fluid" src="/img/service-4.jpg" width={400} height={300} alt="Hazardous Goods Cargo Handling" />
            </div>
            <h4 className="mb-3">Hazardous or Dangerous Goods Cargo Handling</h4>
            <p>
              For hazardous cargo, we offer professional packing, dangerous
              goods documentation, labeling, and freight forwarding to meet
              all international and domestic regulations. We regularly
              handle the international transportation of hazardous chemicals
              and provide the best possible guidance based on UN numbers,
              MSDS, and dangerous goods declarations.
            </p>
            <a className="btn-slide mt-2" href="#">
              <i className="fa fa-arrow-right"></i>
              <span>Read More</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item p-4">
            <div className="overflow-hidden mb-4">
              <Image className="img-fluid" src="/img/service-5.jpg" width={400} height={300} alt="Customs Clearance" />
            </div>
            <h4 className="mb-3">Customs Clearance</h4>
            <p className="home-page">
              We handle customs requirements for import or export
              consignments, providing seamless customs clearance through our
              electronic automation system to meet the ever-changing and
              strict customs laws. We handle all documentation requirements
              for the countries you are importing from and exporting ...
            </p>
            <a className="btn-slide mt-2" href="#">
              <i className="fa fa-arrow-right"></i>
              <span>Read More</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.7s">
          <div className="service-item p-4">
            <div className="overflow-hidden mb-4">
              <Image className="img-fluid" src="/img/service-6.jpg" width={400} height={300} alt="Innovations" />
            </div>
            <h4 className="mb-3">Innovations</h4>
            <p>
              ISCS is at the forefront of supply chain innovation. Our
              ongoing R&D efforts focus on developing new features such as
              AI predictive analytics and mobile applications. We aim to
              continuously improve our offerings to provide our clients with
              the most advanced and efficient supply chain solutions
              available.
            </p>
            <a className="btn-slide mt-2" href="#">
              <i className="fa fa-arrow-right"></i>
              <span>Read More</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Services;