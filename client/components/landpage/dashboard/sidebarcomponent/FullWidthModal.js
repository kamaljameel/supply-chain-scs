import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";

const FullWidthModal = ({
  show,
  onHide,
  onSubmit,
  companyOptions,
  addCompany,
}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedBuyerCompany, setSelectedBuyerCompany] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [formData, setFormData] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [newProduct, setNewProduct] = useState({
    description: "",
    hsCode: "",
    origin: "",
    quantity: "",
    unitPrice: "",
    totalPrice: 0,
  });
  useEffect(() => {
    if (show) {
      const currentDate = new Date();
      const dueDate = new Date(currentDate);
      dueDate.setDate(currentDate.getDate() + 30);

      setFormData((prevData) => ({
        ...prevData,
        invoiceNumber: `INV-${Date.now()}`, // Simple auto-generated invoice number
        invoiceDate: currentDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        dueDate: dueDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      }));
    }
  }, [show]);
  const handleCompanySelect = (value) => {
    setSelectedCompany(value);

    setCurrentStep(2);
  };

  const handleBuyerCompanySelect = (value) => {
    setSelectedBuyerCompany(value);
    setCurrentStep(3);
  };

  const handleAddnewCompany = (type) => {
    if (type === "seller") {
      setSelectedCompany("addNew");
    } else {
      setSelectedBuyerCompany("addNew");
    }
  };

  const handleAddCompany = () => {
    addCompany(newCompany);
    if (selectedBuyerCompany === "addNew") {
      setSelectedBuyerCompany(newCompany);
    } else {
      setSelectedCompany(newCompany);
    }
    setNewCompany("");
    setCurrentStep(currentStep === 2 ? 10 : 11);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => {
      const updatedProduct = { ...prev, [name]: value };
      // Calculate totalPrice if quantity and unitPrice are available
      if (updatedProduct.quantity && updatedProduct.unitPrice) {
        updatedProduct.totalPrice =
          updatedProduct.quantity * updatedProduct.unitPrice;
      } else {
        updatedProduct.totalPrice = 0;
      }
      return updatedProduct;
    });
  };

  const addProduct = () => {
    setProductDetails([...productDetails, newProduct]);
    // Reset newProduct state after adding
    setNewProduct({
      description: "",
      hsCode: "",
      origin: "",
      quantity: "",
      unitPrice: "",
      totalPrice: 0,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const portOptions = {
    karachi: ["Karachi Port", "Karachi PK Port"],
    uk: ["UK Port", "Manchester Port"],
    // Add more port options here
  };

  const handleShippingTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      shippingType: value,
      volume: value === "LCL" ? prevData.volume : "", // Reset volume if shipping type is not LCL
      containerType: value === "FCL" ? prevData.containerType : "", // Reset container type if shipping type is not FCL
    }));
  };
  const handlePortCountryChange = (e) => {
    const { name, value } = e.target;
    const portKey =
      name === "portOfLoadingCountry" ? "portOfLoading" : "portOfDischarge";
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [portKey]: "", // Reset the port selection when the country changes
    }));
  };
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      productDetails,
      selectedCompany,
      selectedBuyerCompany,
    });
    setCurrentStep(1);
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 2:
        return (
          <>
            <h6>Seller/Shipper/Exporter/Supplier Information</h6>
            {/* <Form.Group className="mb-3" controlId="formSellerCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="sellerCompanyName"
                value={formData.sellerCompanyName || ""}
                onChange={handleFormChange}
              />
            </Form.Group> */}
            <Form.Group controlId="companySelect">
              <Form.Label>Select Company</Form.Label>
              <Form.Control
                as="select"
                value={formData.sellerCompanyName}
                onChange={(e) => handleCompanySelect(e.target.value)}
              >
                <option value="">Select a company</option>
                {companyOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedCompany === "addNew" ? (
              <>
                <Form.Group className="mt-3" controlId="newCompanyName">
                  <Form.Label>New Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new company name"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="mt-3"
                  variant="primary"
                  onClick={handleAddCompany}
                >
                  Add Company
                </Button>
              </>
            ) : (
              <Button
                className="mt-3"
                variant="primary"
                onClick={() => handleAddnewCompany("seller")}
              >
                Add new Company
              </Button>
            )}
            <Form.Group className="mb-3" controlId="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="sellerAddress"
                value={formData.sellerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerCityStateZIP">
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="sellerCityStateZIP"
                value={formData.sellerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="sellerCountry"
                value={formData.sellerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="sellerPhone"
                value={formData.sellerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="sellerEmail"
                value={formData.sellerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="sellerWebsite"
                value={formData.sellerWebsite || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <h6>Buyer/Consignee/Importer/Receiver/Bill To Information</h6>
            {/* <Form.Group className="mb-3" controlId="formBuyerCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="buyerCompanyName"
                value={formData.buyerCompanyName || ""}
                onChange={handleFormChange}
              />
            </Form.Group> */}

            <Form.Group controlId="buyerCompanySelect">
              <Form.Label>Select Buyer Company</Form.Label>
              <Form.Control
                as="select"
                value={selectedBuyerCompany}
                onChange={(e) => handleBuyerCompanySelect(e.target.value)}
              >
                <option value="">Select a company</option>
                {companyOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedBuyerCompany === "addNew" ? (
              <>
                <Form.Group className="mt-3" controlId="newBuyerCompanyName">
                  <Form.Label>New Buyer Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new company name"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="mt-3"
                  variant="primary"
                  onClick={handleAddCompany}
                >
                  Add Company
                </Button>
              </>
            ) : (
              <Button
                className="mt-3"
                variant="primary"
                onClick={() => handleAddnewCompany("buyer")}
              >
                Add new Company
              </Button>
            )}
            <Form.Group className="mb-3" controlId="formBuyerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="buyerAddress"
                value={formData.buyerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerCityStateZIP">
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="buyerCityStateZIP"
                value={formData.buyerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="buyerCountry"
                value={formData.buyerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="buyerPhone"
                value={formData.buyerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="buyerEmail"
                value={formData.buyerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerContactPerson">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Person Name"
                name="buyerContactPerson"
                value={formData.buyerContactPerson || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 4:
        return (
          <>
            <h6>Invoice Details</h6>
            <Form.Group className="mb-3" controlId="formInvoiceNumber">
              <Form.Label>Invoice Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Invoice Number"
                name="invoiceNumber"
                value={formData.invoiceNumber || ""}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInvoiceDate">
              <Form.Label>Invoice Date</Form.Label>
              <Form.Control
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate || ""}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 5:
        return (
          <>
            <h6>Shipping Information</h6>
            <Form.Group className="mb-3" controlId="formShipmentDate">
              <Form.Label>Shipment Date</Form.Label>
              <Form.Control
                type="date"
                name="shipmentDate"
                value={formData.shipmentDate || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formPortOfLoading">
              <Form.Label>Port of Loading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Port of Loading"
                name="portOfLoading"
                value={formData.portOfLoading || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPortOfDischarge">
              <Form.Label>Port of Discharge</Form.Label>
              <Form.Control
                type="text"
                placeholder="Port of Discharge"
                name="portOfDischarge"
                value={formData.portOfDischarge || ""}
                onChange={handleFormChange}
              />
            </Form.Group> */}
            <Form.Group controlId="formPortOfLoadingCountry">
              <Form.Label>Port of Loading Country</Form.Label>
              <Form.Control
                as="select"
                name="portOfLoadingCountry"
                value={formData.portOfLoadingCountry}
                onChange={handlePortCountryChange}
              >
                <option value="">Select Country</option>
                <option value="karachi">Karachi</option>
                <option value="uk">UK</option>
                {/* Add more country options here */}
              </Form.Control>
            </Form.Group>
            {formData.portOfLoadingCountry && (
              <Form.Group controlId="formPortOfLoading">
                <Form.Label>Port of Loading</Form.Label>
                <Form.Control
                  as="select"
                  name="portOfLoading"
                  value={formData.portOfLoading}
                  onChange={handleChange}
                >
                  <option value="">Select Port</option>
                  {portOptions[formData.portOfLoadingCountry].map(
                    (port, index) => (
                      <option key={index} value={port}>
                        {port}
                      </option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="formPortOfDischargeCountry">
              <Form.Label>Port of Discharge Country</Form.Label>
              <Form.Control
                as="select"
                name="portOfDischargeCountry"
                value={formData.portOfDischargeCountry}
                onChange={handlePortCountryChange}
              >
                <option value="">Select Country</option>
                <option value="karachi">Karachi</option>
                <option value="uk">UK</option>
                {/* Add more country options here */}
              </Form.Control>
            </Form.Group>
            {formData.portOfDischargeCountry && (
              <Form.Group controlId="formPortOfDischarge">
                <Form.Label>Port of Discharge</Form.Label>
                <Form.Control
                  as="select"
                  name="portOfDischarge"
                  value={formData.portOfDischarge}
                  onChange={handleChange}
                >
                  <option value="">Select Port</option>
                  {portOptions[formData.portOfDischargeCountry].map(
                    (port, index) => (
                      <option key={index} value={port}>
                        {port}
                      </option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formIncoterms">
              <Form.Label>Incoterms</Form.Label>
              <Form.Control
                type="text"
                placeholder="Incoterms (e.g., FOB, CIF)"
                name="incoterms"
                value={formData.incoterms || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formShippingMethod">
              <Form.Label>Shipping Method</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shipping Method (e.g., Air, Sea)"
                name="shippingMethod"
                value={formData.shippingMethod || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCarrier">
              <Form.Label>Carrier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Carrier Name"
                name="carrier"
                value={formData.carrier || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formShippingType">
              <Form.Label>Shipping Type</Form.Label>
              <Form.Control
                as="select"
                name="shippingType"
                value={formData.shippingType}
                onChange={handleShippingTypeChange}
              >
                <option value="">Select Shipping Type</option>
                <option value="LCL">LCL (Less than Container Load)</option>
                <option value="FCL">FCL (Full Container Load)</option>
              </Form.Control>
            </Form.Group>
            {formData.shippingType === "LCL" && (
              <Form.Group controlId="formVolume">
                <Form.Label>Volume</Form.Label>
                <Form.Control
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  placeholder="Enter Volume"
                />
              </Form.Group>
            )}
            {formData.shippingType === "FCL" && (
              <Form.Group controlId="formContainerType">
                <Form.Label>Container Type</Form.Label>
                <Form.Control
                  as="select"
                  name="containerType"
                  value={formData.containerType}
                  onChange={handleChange}
                >
                  <option value="">Select Container Type</option>
                  <option value="20ft">20ft</option>
                  <option value="40ft">40ft</option>
                  <option value="40ft High Cube">40ft High Cube</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="formShippingMode">
              <Form.Label>Shipping Mode</Form.Label>
              <Form.Control
                as="select"
                name="shippingMode"
                value={formData.shippingMode}
                onChange={handleChange}
              >
                <option value="">Select Shipping Mode</option>
                <option value="road">Road</option>
                <option value="sea">Sea</option>
                <option value="air">Air</option>
                <option value="multi modal">Multi Modal</option>
              </Form.Control>
            </Form.Group>
          </>
        );
      case 6:
        return (
          <>
            <h6>Product Details</h6>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item No.</th>
                  <th>Description</th>
                  <th>HS Code</th>
                  <th>Origin of Goods</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.description}</td>
                    <td>{product.hsCode}</td>
                    <td>{product.origin}</td>
                    <td>{product.quantity}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.totalPrice}</td>
                  </tr>
                ))}
                <tr>
                  <td>{productDetails.length + 1}</td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={newProduct.description || ""}
                      onChange={handleProductChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="HS Code"
                      name="hsCode"
                      value={newProduct.hsCode || ""}
                      onChange={handleProductChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Origin of Goods"
                      name="origin"
                      value={newProduct.origin || ""}
                      onChange={handleProductChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Quantity"
                      name="quantity"
                      value={newProduct.quantity || ""}
                      onChange={handleProductChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Unit Price"
                      name="unitPrice"
                      value={newProduct.unitPrice || ""}
                      onChange={handleProductChange}
                    />
                  </td>
                  <td>{newProduct.quantity * newProduct.unitPrice || 0}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" onClick={addProduct}>
              Add Product
            </Button>
          </>
        );
      case 7:
        return (
          <>
            <h6>Payment Terms</h6>
            <Form.Group className="mb-3" controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                type="text"
                placeholder="Payment Method (e.g., Wire Transfer, Letter of Credit)"
                name="paymentMethod"
                value={formData.paymentMethod || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPaymentTerms">
              <Form.Label>Payment Terms</Form.Label>
              <Form.Control
                type="text"
                placeholder="Payment Terms (e.g., 50% advance, 50% upon delivery)"
                name="paymentTerms"
                value={formData.paymentTerms || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Currency"
                name="currency"
                value={formData.currency || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 8:
        return (
          <>
            <h6>Seller Bank Details</h6>
            <Form.Group className="mb-3" controlId="formSellerBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="sellerBankName"
                value={formData.sellerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="sellerAccountNumber"
                value={formData.sellerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerSWIFTCode">
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="sellerSWIFTCode"
                value={formData.sellerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="sellerIBAN"
                value={formData.sellerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerBankAddress">
              <Form.Label>Bank Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Address"
                name="sellerBankAddress"
                value={formData.sellerBankAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 9:
        return (
          <>
            <h6>Buyer Bank Details</h6>
            <Form.Group className="mb-3" controlId="formBuyerBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="buyerBankName"
                value={formData.buyerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="buyerAccountNumber"
                value={formData.buyerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerSWIFTCode">
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="buyerSWIFTCode"
                value={formData.buyerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="buyerIBAN"
                value={formData.buyerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerBankAddress">
              <Form.Label>Bank Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Address"
                name="buyerBankAddress"
                value={formData.buyerBankAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 10:
        return (
          <>
            <h6>Seller/Shipper/Exporter/Supplier Information</h6>
            <Form.Group className="mb-3" controlId="formSellerCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="sellerCompanyName"
                value={formData.sellerCompanyName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="sellerAddress"
                value={formData.sellerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerCityStateZIP">
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="sellerCityStateZIP"
                value={formData.sellerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="sellerCountry"
                value={formData.sellerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="sellerPhone"
                value={formData.sellerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="sellerEmail"
                value={formData.sellerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="sellerWebsite"
                value={formData.sellerWebsite || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <h6>Seller Bank Details</h6>
            <Form.Group className="mb-3" controlId="formSellerBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="sellerBankName"
                value={formData.sellerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="sellerAccountNumber"
                value={formData.sellerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerSWIFTCode">
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="sellerSWIFTCode"
                value={formData.sellerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="sellerIBAN"
                value={formData.sellerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerBankAddress">
              <Form.Label>Bank Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Address"
                name="sellerBankAddress"
                value={formData.sellerBankAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 11:
        return (
          <>
            <h6>Buyer Information</h6>
            <Form.Group className="mb-3" controlId="formBuyerCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="buyerCompanyName"
                value={formData.buyerCompanyName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBuyerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="buyerAddress"
                value={formData.buyerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerCityStateZIP">
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="buyerCityStateZIP"
                value={formData.buyerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="buyerCountry"
                value={formData.buyerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="buyerPhone"
                value={formData.buyerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="buyerEmail"
                value={formData.buyerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="buyerWebsite"
                value={formData.buyerWebsite || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <h6>Buyer Bank Details</h6>
            <Form.Group className="mb-3" controlId="formBuyerBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="buyerBankName"
                value={formData.buyerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="buyerAccountNumber"
                value={formData.buyerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerSWIFTCode">
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="buyerSWIFTCode"
                value={formData.buyerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="buyerIBAN"
                value={formData.buyerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBuyerBankAddress">
              <Form.Label>Bank Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Address"
                name="buyerBankAddress"
                value={formData.buyerBankAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Proforma Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {currentStep === 1 && renderFormFields()} */}
        {/* <> */}
        {/* <Form.Group controlId="companySelect">
              <Form.Label>Select Company</Form.Label>
              <Form.Control
                as="select"
                value={selectedCompany}
                onChange={(e) => handleCompanySelect(e.target.value)}
              >
                <option value="">Select a company</option>
                {companyOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </Form.Control>
            </Form.Group> */}

        {/* {selectedCompany === "addNew" ? (
              <>
                <Form.Group className="mt-3" controlId="newCompanyName">
                  <Form.Label>New Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new company name"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="mt-3"
                  variant="primary"
                  onClick={handleAddCompany}
                >
                  Add Company
                </Button>
              </>
            ) : (
              <Button
                className="mt-3"
                variant="primary"
                onClick={handleAddnewCompany}
              >
                Add new Company
              </Button>
            )}
          </>
        )} */}

        {currentStep === 1 ? (
          <>
            <h6>Seller/Shipper/Exporter/Supplier Information</h6>
            {/* <Form.Group className="mb-3" controlId="formSellerCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="sellerCompanyName"
                value={formData.sellerCompanyName || ""}
                onChange={handleFormChange}
              />
            </Form.Group> */}
            <Form.Group controlId="companySelect">
              <Form.Label>Select Company</Form.Label>
              <Form.Control
                as="select"
                value={formData.sellerCompanyName}
                onChange={(e) => handleCompanySelect(e.target.value)}
              >
                <option value="">Select a company</option>
                {companyOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedCompany === "addNew" ? (
              <>
                <Form.Group className="mt-3" controlId="newCompanyName">
                  <Form.Label>New Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new company name"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="mt-3"
                  variant="primary"
                  onClick={handleAddCompany}
                >
                  Add Company
                </Button>
              </>
            ) : (
              <Button
                className="mt-3"
                variant="primary"
                onClick={handleAddnewCompany}
              >
                Add new Company
              </Button>
            )}
            <Form.Group className="mb-3" controlId="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="sellerAddress"
                value={formData.sellerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerCityStateZIP">
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="sellerCityStateZIP"
                value={formData.sellerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="sellerCountry"
                value={formData.sellerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="sellerPhone"
                value={formData.sellerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="sellerEmail"
                value={formData.sellerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSellerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="sellerWebsite"
                value={formData.sellerWebsite || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <div className="mt-3">
              {currentStep > 1 && (
                <Button variant="secondary" onClick={prevStep} className="me-2">
                  Previous
                </Button>
              )}
              {currentStep < 9 ? (
                <Button variant="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {renderFormFields()}
            <div className="mt-3">
              {currentStep > 1 && (
                <Button variant="secondary" onClick={prevStep} className="me-2">
                  Previous
                </Button>
              )}
              {currentStep < 9 ? (
                <Button variant="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FullWidthModal;
