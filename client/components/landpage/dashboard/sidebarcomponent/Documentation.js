import React, { useState } from "react";
import { Button, Modal, Form, Breadcrumb } from "react-bootstrap";
import FullWidthModal from "./FullWidthModal";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Documentation = () => {
  const [showFullWidthModal, setShowFullWidthModal] = useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("");
  const [submittedData, setSubmittedData] = useState({});
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const [companyOptions, setCompanyOptions] = useState([
    "Company A",
    "Company B",
    "Company C",
  ]);
  const [newInvoiceType, setNewInvoiceType] = useState("");
  const [showNewInvoiceTypeInput, setShowNewInvoiceTypeInput] = useState(false);
  const [invoiceConvert, SetInvoiceConevert] = useState(false);
  const [invoiceTypeOptions, setInvoiceTypeOptions] = useState([
    "Performa Invoice",
    "Commercial Invoice",
  ]);

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    SetInvoiceConevert(false);
    setSelectedInvoiceType("");
  };
  const handleShowInvoiceModal = () => setShowInvoiceModal(true);
  const handleInvoiceConvert = () => {
    SetInvoiceConevert(true);
  };
  const handleInvoiceCancel = () => {
    setShowFullWidthModal(true);
    // SetInvoiceConevert(false);
    // setSelectedInvoiceType("");
    setShowInvoiceModal(false);
  };

  const handleInvoiceTypeSelect = (e) => {
    const value = e.target.value;
    if (value === "Performa Invoice") {
      setShowFullWidthModal(true);
      setShowInvoiceModal(false);
    } else if (value === "Commercial Invoice") {
      // setShowFullWidthModal(true);
      // setShowInvoiceModal(false);
    }
    setSelectedInvoiceType(value);
  };

  const handleFullWidthModalClose = () => {
    setSelectedInvoiceType("");
    setShowFullWidthModal(false);
  };

  // const generatePDF = (data) => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text("Submitted Data", 14, 22);

  //   doc.setFontSize(14);
  //   doc.text(`Document Type: ${data.DocumentType}`, 14, 30);

  //   if (data.productDetails && data.productDetails.length > 0) {
  //     doc.setFontSize(14);
  //     doc.text("Product Details:", 14, 40);

  //     doc.autoTable({
  //       startY: 50,
  //       head: [
  //         [
  //           "Item No.",
  //           "Description",
  //           "HS Code",
  //           "Origin of Goods",
  //           "Quantity",
  //           "Unit Price",
  //           "Total Price",
  //         ],
  //       ],
  //       body: data.productDetails.map((product, index) => [
  //         index + 1,
  //         product.description,
  //         product.hsCode,
  //         product.origin,
  //         product.quantity,
  //         product.unitPrice,
  //         product.totalPrice,
  //       ]),
  //     });
  //   }

  //   // Table for tax, subtotal, and totals
  //   if (data) {
  //     doc.autoTable({
  //       startY: doc.previousAutoTable.finalY + 10,
  //       head: [["Tax in %", "Tax in amount", "Subtotal", "Total"]],
  //       body: [
  //         [data.tax, data.taxPercentage, data.subtotal, data.total], // Single row with the corresponding values
  //       ],
  //     });
  //   }
  //   doc.autoTable({
  //     startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 50,
  //     head: [["Field", "Value"]],
  //     body: Object.entries(data)
  //       .filter(([key]) => key !== "products")
  //       .map(([key, value]) => [key, value]),
  //   });

  //   doc.save("submitted_data.pdf");
  // };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    // doc.text("Submitted Data", 14, 22);

    // Document Type
    doc.setFontSize(14);
    doc.text(`Document Type: ${data.DocumentType}`, 14, 30);

    // Buyer Information (Left Column)
    doc.setFontSize(16);
    doc.text("Buyer Information", 14, 40);

    doc.setFontSize(12);
    doc.text(`Company: ${data.selectedBuyerCompany || "N/A"}`, 14, 50);
    doc.text(`Address: ${data.buyerAddress || "N/A"}`, 14, 55);
    doc.text(`City/State/ZIP: ${data.buyerCityStateZIP || "N/A"}`, 14, 60);
    doc.text(`Email: ${data.buyerEmail || "N/A"}`, 14, 65);
    doc.text(`Phone: ${data.buyerPhone || "N/A"}`, 14, 70);
    doc.text(`Contact Person: ${data.buyerContactPerson || "N/A"}`, 14, 75);

    // Buyer Bank Details
    doc.setFontSize(16);
    doc.text("Buyer Bank Details", 14, 85);
    doc.setFontSize(12);
    doc.text(`Bank Name: ${data.buyerBankName || "N/A"}`, 14, 90);
    doc.text(`Account Number: ${data.buyerAccountNumber || "N/A"}`, 14, 95);
    doc.text(`SWIFT Code: ${data.buyerSwiftCode || "N/A"}`, 14, 100);
    doc.text(`IBAN: ${data.buyerIBAN || "N/A"}`, 14, 105);
    doc.text(`Bank Address: ${data.buyerBankAddress || "N/A"}`, 14, 110);

    // Seller Information (Right Column)
    const rightX = 105; // X-coordinate for the right column
    doc.setFontSize(16);
    doc.text("Seller Information", rightX, 40);

    doc.setFontSize(12);
    doc.text(`Company: ${data.selectedSellerCompany || "N/A"}`, rightX, 50);
    doc.text(`Address: ${data.sellerAddress || "N/A"}`, rightX, 55);
    doc.text(`City/State/ZIP: ${data.sellerCityStateZIP || "N/A"}`, rightX, 60);
    doc.text(`Email: ${data.sellerEmail || "N/A"}`, rightX, 65);
    doc.text(`Phone: ${data.sellerPhone || "N/A"}`, rightX, 70);
    doc.text(`Website: ${data.sellerWebsite || "N/A"}`, rightX, 75);

    // Seller Bank Details
    doc.setFontSize(16);
    doc.text("Seller Bank Details", rightX, 85);
    doc.setFontSize(12);
    doc.text(`Bank Name: ${data.sellerBankName || "N/A"}`, rightX, 90);
    doc.text(
      `Account Number: ${data.sellerAccountNumber || "N/A"}`,
      rightX,
      95
    );
    doc.text(`SWIFT Code: ${data.sellerSwiftCode || "N/A"}`, rightX, 100);
    doc.text(`IBAN: ${data.sellerIBAN || "N/A"}`, rightX, 105);
    doc.text(`Bank Address: ${data.sellerBankAddress || "N/A"}`, rightX, 110);

    // Shipping Information
    doc.setFontSize(16);
    doc.text("Shipping Information", 14, 125);
    doc.setFontSize(12);
    doc.text(`Shipping Type: ${data.shippingType || "N/A"}`, 14, 130);
    if (data.shippingType === "LCL") {
      doc.text(`Volume: ${data.volume || "N/A"}`, 14, 135);
    } else if (data.shippingType === "FCL") {
      doc.text(`Container Type: ${data.containerType || "N/A"}`, 14, 135);
    }
    doc.text(`Shipping Mode: ${data.shippingMode || "N/A"}`, 14, 140);

    // Product Details
    if (data.productDetails && data.productDetails.length > 0) {
      doc.setFontSize(14);
      doc.text("Product Details:", 14, 150);

      doc.autoTable({
        startY: 155,
        head: [
          [
            "Item No.",
            "Description",
            "HS Code",
            "Origin of Goods",
            "Quantity",
            "Unit Price",
            "Total Price",
          ],
        ],
        body: data.productDetails.map((product, index) => [
          index + 1,
          product.description || "N/A",
          product.hsCode || "N/A",
          product.origin || "N/A",
          product.quantity || 0,
          product.unitPrice || 0,
          product.totalPrice || 0,
        ]),
      });
    }

    // Table for tax, subtotal, and totals
    if (data) {
      doc.autoTable({
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 155,
        head: [["Tax in %", "Tax in amount", "Subtotal", "Total"]],
        body: [
          [
            data.taxPercentage || 0,
            data.tax || 0,
            data.subtotal || 0,
            data.total || 0,
          ],
        ],
      });
    }

    // Terms and Conditions
    const startY = doc.previousAutoTable
      ? doc.previousAutoTable.finalY + 20
      : 175;
    doc.setFontSize(14);
    doc.text("Terms and Conditions:", 14, startY);

    const termsText =
      "1. Payment must be made within the due date.\n" +
      "2. The seller is not responsible for any delay caused by the carrier.\n" +
      "3. The buyer must inspect the goods upon receipt and notify the seller within 7 days of any discrepancies.\n" +
      "4. All disputes will be settled in accordance with the laws of the seller's country.";
    const termsStartY = startY + 5;
    const lineHeight = 6;
    const termsArray = doc.splitTextToSize(termsText, 180); // Wrap text to fit within page width
    termsArray.forEach((line, index) => {
      doc.text(line, 14, termsStartY + index * lineHeight);
    });

    // Save the PDF
    doc.save("submitted_data.pdf");
  };

  const handleFullWidthModalSubmit = (data) => {
    const completeData = { ...data, DocumentType: selectedInvoiceType };
    console.log("Form Data:", completeData);
    setSubmittedData(completeData);
    generatePDF(completeData);
    setShowFullWidthModal(false);
  };

  const addCompany = (newCompany) => {
    setCompanyOptions((prevOptions) => [...prevOptions, newCompany]);
  };

  const handleAddInvoiceType = () => {
    setInvoiceTypeOptions([...invoiceTypeOptions, newInvoiceType]);
    setSelectedInvoiceType(newInvoiceType);
    setNewInvoiceType("");
    setShowNewInvoiceTypeInput(false);
  };

  return (
    <>
      <div className="dashboard-main-area">
        <h6>Documentation</h6>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Documentation</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row w-100 mx-auto dashcard">
          <div className="col-md-6 py-2">
            <div className="IXcard rounded-2">
              <div className="d-flex justify-content-between align-items-center bg-dark-subtle p-2">
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
            <div className="IXcard rounded-2">
              <div className="d-flex justify-content-between align-items-center bg-dark-subtle p-2">
                <h6 className="m-0">Export</h6>
                <Button
                  className="btn rounded-3"
                  onClick={handleShowInvoiceModal}
                >
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
      <Modal
        show={showInvoiceModal}
        onHide={handleCloseInvoiceModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Document Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoiceType === "Commercial Invoice" ? (
            !invoiceConvert ? (
              <div>
                <h6>
                  Do you want to convert performa invoice into commercial
                  invoice?
                </h6>
                <Button variant="primary" onClick={handleInvoiceConvert}>
                  Yes
                </Button>
                <Button
                  variant="danger"
                  onClick={handleInvoiceCancel}
                  className="ms-2"
                >
                  No
                </Button>
              </div>
            ) : (
              <Form.Group
                className="formgroupk mb-3 w-100 h-100"
                controlId="formInvoiceType"
              >
                <Form.Label>Select</Form.Label>
                <Form.Control as="select">
                  <option value="">Select Type</option>
                  <option value="">performa invoice 1</option>
                  <option value="">performa invoice 2</option>
                </Form.Control>
              </Form.Group>
            )
          ) : (
            <Form.Group
              className="formgroupk mb-3 w-100 h-100"
              controlId="formInvoiceType"
            >
              <Form.Label>Select Document Type</Form.Label>
              <Form.Control
                as="select"
                value={selectedInvoiceType}
                onChange={handleInvoiceTypeSelect}
              >
                <option value="">Select Document Type</option>
                {invoiceTypeOptions.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
              <Button
                onClick={() => setShowNewInvoiceTypeInput(true)}
                className="mt-2 px-0 bg-transparent text-primary text-decoration-underline border-0 pb-0"
              >
                Add new Document Type
              </Button>
              {showNewInvoiceTypeInput && (
                <>
                  <Form.Control
                    type="text"
                    placeholder="New Invoice Type"
                    value={newInvoiceType}
                    onChange={(e) => setNewInvoiceType(e.target.value)}
                    className="mt-2"
                  />
                  <Button onClick={handleAddInvoiceType} className="mt-2 ">
                    Add Document Type
                  </Button>
                </>
              )}
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInvoiceModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <FullWidthModal
        show={showFullWidthModal}
        onHide={handleFullWidthModalClose}
        onSubmit={handleFullWidthModalSubmit}
        companyOptions={companyOptions}
        addCompany={addCompany}
        selectedInvoiceType={selectedInvoiceType}
      />
      {/* {submittedData && (
        <div>
          <h3>Submitted Data</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )} */}
    </>
  );
};

export default Documentation;
