import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Form, Breadcrumb } from "react-bootstrap";
import FullWidthModal from "./FullWidthModal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

import {
  pdfsApi,
  sendpdfToEmailApi,
  getInquiries,
  fetchFileApi,
  getInquiryById,
  getUserInquiryListApi,
} from "@/utils/apiRoutes";
import InquiriesTable from "./InquiriesTable";
import FileUploadList from "../FileUploadList";
import FileUpload from "./FileUpload";

const Documentation = ({ userId }) => {
  const [showFullWidthModal, setShowFullWidthModal] = useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("");
  const [submittedData, setSubmittedData] = useState({});
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
  const [editInquiry, setEditInquiry] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [fileRefreshKey, setFileRefreshKey] = useState(0);
  const [editFromSaved, setEditFromSaved] = useState(false);

  const [savedCount, setSavedCount] = useState(0);
  const [showSavedFormModal, setShowSavedFormModal] = useState(false);
  const [savedForms, setSavedForms] = useState([]);
  // Fetch saved forms
  const fetchSavedForms = () => {
    if (userId) {
      axios
        .get(getUserInquiryListApi(userId))
        .then((response) => {
          const data = response.data;
          setSavedCount(data.length);
          setSavedForms(data);
        })
        .catch((err) => {
          console.error("Axios fetch error:", err);
        });
    }
  };
  const handleEditClick = (inquiry) => {
    setEditInquiry(inquiry);
    console.log("ahmad", inquiry);
  };
  const handleSavedFormEdit = async (inquiryId) => {
    try {
      const res = await getInquiryById(inquiryId);
      setEditInquiry(res.data);
      setEditFromSaved(true); // Set flag to indicate this is from saved form
      setShowSavedFormModal(false); // Close saved forms modal
      setShowFullWidthModal(true); // Open the full width modal
      console.log("Editing saved form:", res.data);
    } catch (error) {
      console.error("Failed to fetch inquiry for editing:", error);
      toast.error("Failed to load saved form");
    }
  };
  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  const triggerFileRefresh = () => {
    setFileRefreshKey((prevKey) => prevKey + 1);
  };
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getInquiries();
      setData(response.data);
      console.log("submiteed", response.data);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(fetchFileApi);
      setUploadedFiles(response.data.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };
  useEffect(() => {
    fetchUploadedFiles();
    fetchData();
  }, []);

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    SetInvoiceConevert(false);
    setSelectedInvoiceType("");
  };

  const handleCloseIMportModal = () => {
    setShowImportModal(false);
  };
  const handleShowInvoiceModal = () => setShowInvoiceModal(true);
  const handleShowImportModal = () => setShowImportModal(true);
  const handleInvoiceConvert = () => {
    SetInvoiceConevert(true);
  };
  const handleInvoiceCancel = () => {
    setShowFullWidthModal(true);
    // SetInvoiceConevert(false);
    // setSelectedInvoiceType("");
    setShowInvoiceModal(false);
  };

  // useEffect(() => {
  //   if (editInquiry) {
  //     setShowFullWidthModal(true);
  //   }
  // }, [editInquiry]);
  useEffect(() => {
    fetchSavedForms();
  }, [userId, showFullWidthModal, refreshKey]);

  useEffect(() => {
    if (editInquiry && !editFromSaved) {
      setShowFullWidthModal(true);
    }
  }, [editInquiry, editFromSaved]);

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

  const generatePDF = async (data, InquiryID) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    doc.text(`Inquiry ID: ${InquiryID}`, 10, 10);
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title - Centered Document Type
    doc.setFontSize(20);
    const documentTypeText = `${data.DocumentType}`;
    const documentTypeWidth =
      (doc.getStringUnitWidth(documentTypeText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const documentTypeX = (pageWidth - documentTypeWidth) / 2;
    doc.text(documentTypeText, documentTypeX, 22);

    // Invoice Number (Left) and Invoice Date (Right)
    doc.setFontSize(11);
    doc.text(`Invoice Number: ${data.inquiryLine || "N/A"}`, 11, 32);

    // Invoice Date on the right side
    const invoiceDateText = `Invoice Date: ${
      data.invoiceDate || new Date().toLocaleDateString()
    }`;
    const invoiceDateWidth =
      (doc.getStringUnitWidth(invoiceDateText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const invoiceDateX = pageWidth - 11 - invoiceDateWidth;
    doc.text(invoiceDateText, invoiceDateX, 32);

    // Seller Information (Left Column)
    doc.setFontSize(12);
    doc.text("Seller Information", 11, 45);

    // Add separator line below Seller Information title
    doc.setLineWidth(0.5);
    doc.line(11, 50, 95, 50);

    doc.setFontSize(11);
    doc.text(`Company: ${data.selectedSellerCompany || "N/A"}`, 11, 55);
    doc.text(`Address: ${data.Shipping_FullAddress || "N/A"}`, 11, 62);
    doc.text(`City/State/ZIP: ${data.LCity || "N/A"}`, 11, 69);
    doc.text(`Country: ${data.LCountry || "N/A"}`, 11, 76);
    doc.text(`Email: ${data.BusinessEmail1 || "N/A"}`, 11, 83);
    doc.text(`Phone: ${data.BusinessPhone1 || "N/A"}`, 11, 90);
    doc.text(`Website: ${data.Website || "N/A"}`, 11, 97);

    // Buyer Information (Right Column)
    const rightX = 125; // X-coordinate for the right column
    doc.setFontSize(12);
    doc.text("Buyer Information", rightX, 45);

    // Add separator line below Buyer Information title
    doc.setLineWidth(0.5);
    doc.line(rightX, 50, pageWidth - 11, 50);

    doc.setFontSize(11);
    doc.text(`Company: ${data.selectedBuyerCompany || "N/A"}`, rightX, 55);
    doc.text(`Address: ${data.buyerFullAddress || "N/A"}`, rightX, 62);
    doc.text(`City/State/ZIP: ${data.buyerCityStateZIP || "N/A"}`, rightX, 69);
    doc.text(`Country: ${data.buyerCountry || "N/A"}`, rightX, 76);
    doc.text(`Email: ${data.buyerEmail || "N/A"}`, rightX, 83);
    doc.text(`Phone: ${data.buyerPhone || "N/A"}`, rightX, 90);
    doc.text(`Website: ${data.buyerWebsite || "N/A"}`, rightX, 97);
    doc.text(
      `Contact Person: ${data.buyerContactPerson || "N/A"}`,
      rightX,
      104
    );

    // Product Details
    let productDetailsY = 117;
    if (data.productDetails && data.productDetails.length > 0) {
      doc.setFontSize(12);
      doc.text("Product Details", 11, productDetailsY);

      // Add separator line below Product Details title
      doc.setLineWidth(0.5);
      doc.line(11, productDetailsY + 5, pageWidth - 11, productDetailsY + 5);

      doc.autoTable({
        startY: productDetailsY + 10,
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
        startY: doc.previousAutoTable
          ? doc.previousAutoTable.finalY + 10
          : productDetailsY + 15,
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

    // Shipping Information - Below product details in two columns
    let shippingY = doc.previousAutoTable
      ? doc.previousAutoTable.finalY + 15
      : 170;

    // Check if shipping information would go off the page
    if (shippingY + 60 > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      shippingY = 20; // Reset to top of new page with some margin
    }

    // Shipping Information Header
    doc.setFontSize(12);
    doc.text("Shipping Information", 11, shippingY);

    // Add separator line below Shipping Information title
    doc.setLineWidth(0.5);
    doc.line(11, shippingY + 5, pageWidth - 11, shippingY + 5);

    // Left column of shipping details
    const leftColX = 11;
    const rightColX = 105;
    doc.setFontSize(11);

    // Left column shipping details
    doc.text(
      `Shipment Date: ${data.shipmentDate || "N/A"}`,
      leftColX,
      shippingY + 10
    );
    doc.text(
      `Shipping Mode: ${data.shippingMode || "N/A"}`,
      leftColX,
      shippingY + 17
    );
    doc.text(`Carrier: ${data.carrier || "N/A"}`, leftColX, shippingY + 24);
    doc.text(
      `Shipping Terms: ${data.shippingTermsName || "N/A"}`,
      leftColX,
      shippingY + 31
    );
    doc.text(
      `Shipping Method: ${data.shippingMethodName || "N/A"}`,
      leftColX,
      shippingY + 38
    );
    doc.text(
      `Payment Terms: ${data.paymentTermsName || "N/A"}`,
      leftColX,
      shippingY + 45
    );

    // Right column shipping details
    doc.text(
      `Payment Method: ${data.paymentMethodName || "N/A"}`,
      rightColX,
      shippingY + 10
    );
    doc.text(
      `Variance Terms: ${data.varianceTermsName || "N/A"}`,
      rightColX,
      shippingY + 17
    );
    doc.text(
      `Port Of Loading Country: ${data.portOfLoadingCountry || "N/A"}`,
      rightColX,
      shippingY + 24
    );
    doc.text(
      `Port Of Loading: ${data.portOfLoadingName || "N/A"}`,
      rightColX,
      shippingY + 31
    );
    doc.text(
      `Port Of Discharge Country: ${data.portOfDischargeCountry || "N/A"}`,
      rightColX,
      shippingY + 38
    );
    doc.text(
      `Port Of Discharge: ${data.portOfDischargeName || "N/A"}`,
      rightColX,
      shippingY + 45
    );

    // Bank Details - Below shipping information
    let bankDetailsY = shippingY + 60;

    // Check if bank details would go off the page
    if (bankDetailsY + 70 > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      bankDetailsY = 20; // Reset to top of new page with some margin
    }

    // Bank Details Header with clear separation
    doc.setFontSize(12);
    doc.text("Bank Details", pageWidth / 2 - 15, bankDetailsY);

    // Add a separator line below the header
    doc.setLineWidth(0.5);
    doc.line(11, bankDetailsY + 5, pageWidth - 11, bankDetailsY + 5);

    // Seller Bank Details - Left Column
    doc.setFontSize(11);
    doc.text("Seller Bank Details", leftColX, bankDetailsY + 15);
    doc.setFontSize(11);
    doc.text(
      `Bank Name: ${data.sellerBankName || "N/A"}`,
      leftColX,
      bankDetailsY + 25
    );
    doc.text(
      `Account Number: ${data.sellerAccountNumber || "N/A"}`,
      leftColX,
      bankDetailsY + 32
    );
    doc.text(
      `SWIFT Code: ${data.sellerSWIFTCode || "N/A"}`,
      leftColX,
      bankDetailsY + 39
    );
    doc.text(`IBAN: ${data.sellerIBAN || "N/A"}`, leftColX, bankDetailsY + 46);
    doc.text(
      `Bank Address: ${data.sellerBankAddress || "N/A"}`,
      leftColX,
      bankDetailsY + 53
    );

    // Buyer Bank Details - Right Column
    doc.setFontSize(11);
    doc.text("Buyer Bank Details", rightColX, bankDetailsY + 15);
    doc.setFontSize(11);
    doc.text(
      `Bank Name: ${data.buyerBankName || "N/A"}`,
      rightColX,
      bankDetailsY + 25
    );
    doc.text(
      `Account Number: ${data.buyerAccountNumber || "N/A"}`,
      rightColX,
      bankDetailsY + 32
    );
    doc.text(
      `SWIFT Code: ${data.buyerSWIFTCode || "N/A"}`,
      rightColX,
      bankDetailsY + 39
    );
    doc.text(`IBAN: ${data.buyerIBAN || "N/A"}`, rightColX, bankDetailsY + 46);
    doc.text(
      `Bank Address: ${data.buyerBankAddress || "N/A"}`,
      rightColX,
      bankDetailsY + 53
    );

    // Terms and Conditions - Below bank details
    const termsY = bankDetailsY + 65;

    // Check if Terms would go off the page
    if (termsY + 40 > doc.internal.pageSize.getHeight() - 10) {
      doc.addPage();
      var termsStartY = 20; // Start at top of new page with margin
    } else {
      var termsStartY = termsY;
    }

    // Terms and Conditions Header with clean separation
    doc.setFontSize(12);
    doc.text("Terms and Conditions", 11, termsStartY);

    // Add a separator line below the header
    doc.setLineWidth(0.5);
    doc.line(11, termsStartY + 5, pageWidth - 11, termsStartY + 5);

    // Terms and Conditions content
    const termsText =
      "1. Payment must be made within the due date.\n" +
      "2. The seller is not responsible for any delay caused by the carrier.\n" +
      "3. The buyer must inspect the goods upon receipt and notify the seller within 7 days of any discrepancies.\n" +
      "4. All disputes will be settled in accordance with the laws of the seller's country.";
    const lineHeight = 8; // Good spacing for terms
    const termsArray = doc.splitTextToSize(termsText, 180); // Wrap text to fit within page width
    termsArray.forEach((line, index) => {
      doc.text(line, 11, termsStartY + 15 + index * lineHeight);
    });

    // Convert to Blob and upload to API
    try {
      const pdfBlob = doc.output("blob");
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "submitted_data.pdf");

      const response = await axios.post(`${pdfsApi}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message);
      // fetchUploadedPDFs();
    } catch (error) {
      console.error("Error uploading PDF:", error);

      toast.error("Failed to upload PDF");
    }

    return doc;
  };
  // const handleDownloadPDF = async (InquiryID) => {
  //   const doc = await generatePDF(submittedData);
  //   doc.save("submitted_data.pdf");
  // };
  const handleDownloadPDF = async (InquiryID) => {
    const doc = await generatePDF(submittedData, InquiryID);
    doc.save(`inquiry_${InquiryID}.pdf`);
  };

  const handleSendEmail = async () => {
    const doc = generatePDF(submittedData);
    const pdfBlob = doc.output("blob");

    const formData = new FormData();
    formData.append("pdf", pdfBlob, "submitted_data.pdf");
    formData.append("email", "kamaljameel14@gmail.com");

    try {
      const response = await axios.post(
        `${sendpdfToEmailApi}/send-email`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);

      toast.success("Failed to send email");
    }
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
                <Button
                  className="btn rounded-3"
                  onClick={handleShowImportModal}
                >
                  <i className="bi bi-pencil-square me-2"></i> Create
                </Button>
              </div>
              <div className="p-2 border-1 border-dark-subtle border-bottom">
                Saved 3
              </div>
              <div className="p-2">Submitted {uploadedFiles.length}</div>
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
              <div
                className="p-2 border-1 border-dark-subtle border-bottom"
                onClick={() => setShowSavedFormModal(true)}
                style={{
                  cursor: "pointer",
                }}
              >
                Saved {savedCount}
              </div>
              <div className="p-2">
                Submitted{" "}
                <span>
                  {/* display inquiry details here */}
                  {data.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={showSavedFormModal}
          onClick={() => setShowSavedFormModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Saved Forms</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {savedForms.length === 0 ? (
              <p>No saved forms found.</p>
            ) : (
              <div className="list-group">
                {savedForms.map((form) => (
                  <div
                    key={form.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSavedFormEdit(form.inquiry_id)}
                  >
                    <div>
                      <p className="mb-0">
                        <strong>Inquiry ID:</strong> {form.inquiry_id}{" "}
                      </p>
                      <p className="mb-0">
                        <strong>Business Name:</strong> {form.business_name}
                      </p>
                      {form.created_at && (
                        <>
                          <p className="mb-0">
                            <small className="text-muted">
                              Saved:{" "}
                              {new Date(form.created_at).toLocaleDateString()}
                            </small>
                          </p>
                        </>
                      )}
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSavedFormEdit(form.inquiry_id);
                      }}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowSavedFormModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <div className="p-4 my-3 border rounded-2 d-flex gap-2">
          <Button variant="primary" onClick={handleDownloadPDF} disabled>
            Download PDF
          </Button>
          <Button
            variant="success"
            onClick={handleSendEmail}
            className="ml-2"
            disabled
          >
            Send PDF via Email
          </Button>
        </div> */}
        <div>
          {/* {pdfs.length === 0 ? (
            <p>No PDFs found.</p>
          ) : (
            <ul className="space-y-2">
              {pdfs.map((pdf, index) => (
                <li key={index}>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {pdf.name}
                  </a>
                </li>
              ))}
            </ul>
          )} */}
        </div>
        <InquiriesTable
          onEditClick={handleEditClick}
          refreshTrigger={refreshKey}
          onDownload={handleDownloadPDF}
        />
        <FileUploadList refreshfileKey={fileRefreshKey} />
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

      {/* file opload modal */}
      <Modal
        show={showImportModal}
        onHide={handleCloseIMportModal}
        backdrop="static"
        keyboard={false}
        fullscreen="xl-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Document Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileUpload onUploadSuccess={triggerFileRefresh} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIMportModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* --- */}
      <ToastContainer />
      <FullWidthModal
        show={showFullWidthModal}
        onHide={handleFullWidthModalClose}
        onSubmit={handleFullWidthModalSubmit}
        companyOptions={companyOptions}
        addCompany={addCompany}
        selectedInvoiceType={selectedInvoiceType}
        inquiry={editInquiry}
        onUpdated={triggerRefresh}
        userId={userId}
      />
      {submittedData && (
        <div>
          {/* <h3>Submitted Data</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre> */}
        </div>
      )}
    </>
  );
};

export default Documentation;
