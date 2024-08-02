import React from "react";
import { Button } from "react-bootstrap";

export default function HomeCards({ onPinClick }) {
  return (
    <div className="row w-100 mx-auto dashcard">
      <div className="col-md-3 py-2">
        <div className="IXcard rounded-2">
          <div className="d-flex justify-content-between align-items-center bgBlue px-3 py-4">
            <h6 className="m-0 text-white">Documentation</h6>
            <Button
              className="btn rounded-3 bg-white"
              onClick={() => onPinClick("Documentation")}
            >
              <i className="bi bi-pin text_Blue"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-3 py-2">
        <div className="IXcard rounded-2">
          <div className="d-flex justify-content-between align-items-center bgBlue px-3 py-4">
            <h6
              className="m-0 text-white"
              onClick={() => onCardClick("Road Transport")}
            >
              Road Transport
            </h6>
            <Button
              className="btn rounded-3 bg-white"
              onClick={() => onPinClick("Road Transport")}
            >
              <i className="bi bi-pin text_Blue"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-3 py-2">
        <div className="IXcard rounded-2">
          <div className="d-flex justify-content-between align-items-center bgBlue px-3 py-4">
            <h6
              className="m-0 text-white"
              onClick={() => onCardClick("Sea Shipment")}
            >
              Sea Shipment
            </h6>
            <Button
              className="btn rounded-3 bg-white"
              onClick={() => onPinClick("Sea Shipment")}
            >
              <i className="bi bi-pin text_Blue"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-3 py-2">
        <div className="IXcard rounded-2">
          <div className="d-flex justify-content-between align-items-center bgBlue px-3 py-4">
            <h6
              className="m-0 text-white"
              onClick={() => onCardClick("Goods Declarations")}
            >
              Goods Declarations
            </h6>
            <Button
              className="btn rounded-3 bg-white"
              onClick={() => onPinClick("Goods Declarations")}
            >
              <i className="bi bi-pin text_Blue"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-3 py-2">
        <div className="IXcard rounded-2">
          <div className="d-flex justify-content-between align-items-center bgBlue px-3 py-4">
            <h6
              className="m-0 text-white"
              onClick={() => onCardClick("Air Shipment")}
            >
              Air Shipment
            </h6>
            <Button
              className="btn rounded-3 bg-white"
              onClick={() => onPinClick("Air Shipment")}
            >
              <i className="bi bi-pin text_Blue"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
