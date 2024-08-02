import React from "react";
import { Breadcrumb, Button } from "react-bootstrap";

export default function GoodsDeclarations() {
  return (
    <div className="dashboadmainarea">
      <h6>Goods Declarations</h6>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Goods Declarations</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row w-100 mx-auto dashcard">
        <div className="col-md-6 py-2">
          <div className="IXcard  rounded-2 ">
            <div className=" d-flex justify-content-between align-items-center bg-dark-subtle p-2">
              <h6 className="m-0">Import</h6>
              <Button className="btn rounded-3">
                <i className="bi bi-pencil-square me-2"></i> Create
              </Button>
            </div>
            <div className="p-2 border-1 border-dark-subtle border-bottom">
              Saved 3
            </div>
            <div className="p-2">Submitted 7</div>
          </div>
        </div>
        <div className="col-md-6 py-2">
          <div className="IXcard  rounded-2 ">
            <div className=" d-flex justify-content-between align-items-center bg-dark-subtle p-2">
              <h6 className="m-0">Export</h6>
              <Button className="btn rounded-3">
                <i className="bi bi-pencil-square me-2"></i> Create
              </Button>
            </div>
            <div className="p-2 border-1 border-dark-subtle border-bottom">
              Saved 3
            </div>
            <div className="p-2">Submitted 7</div>
          </div>
        </div>
      </div>
    </div>
  );
}
