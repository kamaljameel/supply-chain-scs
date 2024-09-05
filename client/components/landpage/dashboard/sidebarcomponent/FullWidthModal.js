import React, { useReducer, useEffect, useState } from "react";
import { Modal, Form, Button, Table, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { addProductApi } from "@/utils/apiRoutes";
import ProductForm from "./ProductForm";
import Select from "react-select";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";

// Initial state for the reducer
const initialState = {
  currentStep: 2,
  selectedSellerCompany: "",
  selectedBuyerCompany: "",
  newCompany: "",
  formData: {
    sellerPhone: "",
    sellerCountry: "",
  },
  productDetails: [],
  newProduct: {
    description: "",
    hsCode: "",
    origin: "",
    quantity: "",
    unitPrice: "",
    totalPrice: 0,
  },
  showNewProduct: false,
  addSellerCompany: false,
  addBuyerCompany: false,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case "SET_NEW_PRODUCT":
      return {
        ...state,
        newProduct: action.newProduct,
      };
    case "ADD_PRODUCT_DETAIL":
      return {
        ...state,
        productDetails: [...state.productDetails, action.productDetail],
      };
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.step,
      };
    case "RESET_FORM":
      return initialState;
    // Add more cases as needed
    default:
      return state;
  }
};
const FullWidthModal = ({
  show,
  onHide,
  onSubmit,
  companyOptions,
  addCompany,
  selectedInvoiceType,
}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedSellerCompany, setselectedSellerCompany] = useState("");
  const [selectedBuyerCompany, setSelectedBuyerCompany] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [formData, setFormData] = useState({
    sellerPhone: "",
    sellerCountry: "",
    sellerCountryCode: "",
    buyerPhone: "",
    buyerCountry: "",
    buyerCountryCode: "",
    portOfLoadingCountry: "",
    portOfLoading: "",
    portOfDischargeCountry: "",
    portOfDischarge: "",
    sellerLogo: null,
    buyerLogo: null,
    sellerDocument: null,
  });
  const [productDetails, setProductDetails] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [newProduct, setNewProduct] = useState({
    description: "",
    hsCode: "",
    origin: "",
    quantity: "",
    unitPrice: "",
    totalPrice: 0,
  });

  // Generate country options with country codes
  const countries = countryList()
    .getData()
    .map((country) => {
      return {
        label: country.label, // Full country name
        value: country.value, // Two-letter country code
      };
    });
  const countryOptions = countryList()
    .getData()
    .map((country) => ({
      value: country.value,
      label: country.label,
    }));
  // const portOptions = {
  //   US: [
  //     { value: "NY", label: "New York" },
  //     { value: "LA", label: "Los Angeles" },
  //   ],
  //   CN: [
  //     { value: "SH", label: "Shanghai" },
  //     { value: "GZ", label: "Guangzhou" },
  //   ],
  //   // Add more countries and ports here
  // };

  // get products===============
  const [products, setProducts] = useState([]);
  const [showNewProduct, setNewProductShow] = useState(false);

  const handleNewProductClose = () => setNewProductShow(false);
  const handleNewProductShow = () => setNewProductShow(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(addProductApi);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate subtotal, tax, and total when product details change
  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = productDetails.reduce(
        (acc, product) => acc + product.totalPrice,
        0
      );
      const total = subtotal + parseFloat(tax || 0);

      setSubtotal(subtotal);
      setTotal(total);
    };

    calculateTotals();
  }, [productDetails, tax]);
  const handleSelect = (e) => {
    const selectedProductId = e.target.value;

    // Check if selectedProductId is a valid selection
    if (!selectedProductId || selectedProductId === "Select a Product") {
      setNewProduct({
        description: "",
        hsCode: "",
        origin: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
      });
      return; // Exit early if no valid selection is made
    }

    // Parse selectedProductId as a number if it's not already
    const parsedProductId = parseInt(selectedProductId);

    // Find the selected product by id
    const selectedProduct = products.find(
      (product) => product.id === parsedProductId
    );

    if (selectedProduct) {
      setNewProduct({
        // description: selectedProduct.productDescription || "",
        description: selectedProduct.productName || "",

        hsCode: selectedProduct.hsCode || "",
        origin: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
      });
    } else {
      console.error(`Product with ID ${parsedProductId} not found.`);
    }
  };
  const handleLogoUpload = (e, logoType) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [logoType]: file,
    });
  };

  useEffect(() => {
    if (show) {
      const currentDate = new Date();
      const dueDate = new Date(currentDate);
      dueDate.setDate(currentDate.getDate() + 30);

      setFormData((prevData) => ({
        ...prevData,
        invoiceNumber: `PIN-${Date.now()}`, // Simple auto-generated invoice number
        invoiceDate: currentDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        dueDate: dueDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      }));
    }
  }, [show]);

  const handleCompanySelect = (value) => {
    setselectedSellerCompany(value);

    setCurrentStep(2);
  };
  const [addsellercom, setAddsellercom] = useState(false);
  const [AddBuyercom, setAddBuyercom] = useState(false);
  const handleBuyerCompanySelect = (value) => {
    setSelectedBuyerCompany(value);
    setCurrentStep(3);
  };
  const [isAddingNewForm, setIsAddingNewForm] = useState(null);

  const handleAddnewCompany = (type) => {
    if (type === "seller") {
      setselectedSellerCompany("addNew");
      setCurrentStep(10);
      setAddsellercom(true);
    } else {
      setSelectedBuyerCompany("addNew");
      setCurrentStep(11);
      setAddBuyercom(true);
    }
  };
  useEffect(() => {
    if (currentStep === 10 || currentStep === 11) {
      setIsAddingNewForm(true);
    } else {
      setIsAddingNewForm(false);
    }
  }, [currentStep]);
  const onHidep = () => {
    if (currentStep === 11) {
      setCurrentStep(3);
    } else {
      setCurrentStep(2);
    }

    setAddsellercom(false);
    setAddBuyercom(false);
    if (isAddingNewForm) {
      // Prevent modal from closing if a new form is being added
      return;
    }
    onHide();
  };

  const handleTaxChange = (e) => {
    setTax(e.target.value);
  };
  const handleAddCompany = () => {
    addCompany(newCompany);
    if (selectedBuyerCompany === "addNew") {
      setSelectedBuyerCompany(newCompany);
      setCurrentStep(2);
      setAddBuyercom(false);
    } else {
      setselectedSellerCompany(newCompany);
      setCurrentStep(2);
      setAddsellercom(false);
    }
    setNewCompany("");
    setCurrentStep(2);
    setAddsellercom(false);
    setAddBuyercom(false);
  };
  const handleFileChange = (file) => {
    // Define allowed file types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (file) {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, DOC, and XLS files are allowed.");
        return;
      }

      // Optional: Check file size (e.g., 10 MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should not exceed 10 MB.");
        return;
      }

      // Update formData state with the selected file
      setFormData({
        ...formData,
        sellerDocument: file,
      });
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch({
      type: "SET_FORM_DATA",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleCountrySelect = (selectedOption) => {
    const countryCode = selectedOption ? selectedOption.value : "";
    setFormData((prevData) => ({
      ...prevData,
      sellerCountry: selectedOption.label, // Full country name
      sellerCountryCode: countryCode,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      sellerPhone: value,
    }));
  };

  // buyer handle country
  const handleBuyerCountrySelect = (selectedBOption) => {
    setFormData((prevData) => ({
      ...prevData,
      buyerCountry: selectedBOption.label || "", // Full country name
      buyerCountryCode: selectedBOption.value || "",
    }));
  };
  const handleBuyerPhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      buyerPhone: value,
    }));
  };

  // ==
  // const handleProductChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewProduct((prev) => {
  //     const updatedProduct = { ...prev, [name]: value };
  //     // Calculate totalPrice if quantity and unitPrice are available
  //     if (updatedProduct.quantity && updatedProduct.unitPrice) {
  //       updatedProduct.totalPrice =
  //         updatedProduct.quantity * updatedProduct.unitPrice;
  //     } else {
  //       updatedProduct.totalPrice = 0;
  //     }
  //     return updatedProduct;
  //   });
  // };
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...newProduct, [name]: value };

    if (name === "quantity" || name === "unitPrice") {
      updatedProduct.totalPrice =
        updatedProduct.quantity * updatedProduct.unitPrice;
    }

    setNewProduct(updatedProduct);
  };
  // Handling port selection if the country has valid port options
  const handleEditProduct = (index) => {
    const productToEdit = productDetails[index];
    setNewProduct(productToEdit); // Populate the form with the product details
    setProductDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteProduct = (index) => {
    setProductDetails((prev) => prev.filter((_, i) => i !== index));
    setSubtotal(0);
    setTax(0);
    setTotal(0);
    setNewProduct({
      description: "",
      hsCode: "",
      origin: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    });
  };

  const handleShippingCountrySelect = (selectedOption, field) => {
    const value = selectedOption ? selectedOption.value : "";
    const label = selectedOption ? selectedOption.label : "";
    const portKey =
      field === "portOfLoadingCountry" ? "portOfLoading" : "portOfDischarge";

    setFormData((prevData) => ({
      ...prevData,
      [field]: label,
      [portKey]: "", // Reset port when country changes
    }));
  };
  // const handlePortSelect = (selectedOption, field) => {
  //   const label = selectedOption ? selectedOption.label : "";

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: label, // Save the label of the selected port
  //   }));
  // };

  // const portOfDischargeOptions = portOptions[formData.portOfDischargeCountry] || [];
  const addProduct = () => {
    // setProductDetails([...productDetails, newProduct]);
    // // Reset newProduct state after adding
    // setNewProduct({
    //   description: "",
    //   hsCode: "",
    //   origin: "",
    //   quantity: "",
    //   unitPrice: "",
    //   totalPrice: 0,
    // });
    setProductDetails((prev) => [...prev, newProduct]);
    setNewProduct({
      description: "",
      hsCode: "",
      origin: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    });
    dispatch({ type: "ADD_PRODUCT_DETAIL", productDetail: state.newProduct });
    dispatch({ type: "SET_NEW_PRODUCT", newProduct: initialState.newProduct });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
  // const handlePortCountryChange = (e) => {
  //   const { name, value } = e.target;
  //   const portKey =
  //     name === "portOfLoadingCountry" ? "portOfLoading" : "portOfDischarge";
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //     [portKey]: "", // Reset the port selection when the country changes
  //   }));
  // };
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit({
  //     ...formData,
  //     productDetails,
  //     selectedSellerCompany,
  //     selectedBuyerCompany,
  //     sellerLogo: formData.sellerLogo,
  //   });
  //   setCurrentStep(1);
  //   setTimeout(() => {
  //     // Reset form data fields here
  //     setFormData({});
  //     setProductDetails([]); // Reset productDetails
  //     setselectedSellerCompany(null); // Reset selectedSellerCompany
  //     setSelectedBuyerCompany(null); // Reset selectedBuyerCompany
  //   }, 2000);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object for file upload
    const formDataWithFile = new FormData();

    // Append the file (sellerLogo) to FormData
    if (formData.sellerLogo) {
      formDataWithFile.append("sellerLogo", formData.sellerLogo);
    }
    if (formData.buyerLogo) {
      formDataWithFile.append("buyerLogo", formData.buyerLogo);
    }

    // Append other form data fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key !== "sellerLogo" && key !== "buyerLogo") {
        formDataWithFile.append(key, formData[key]);
      }
    });

    // Append subtotal, tax, and total to FormData
    formDataWithFile.append("subtotal", subtotal);
    formDataWithFile.append("tax", tax);
    formDataWithFile.append("total", total);

    // If you're submitting the data as an object, do that here
    onSubmit({
      ...formData,
      productDetails,
      subtotal,
      tax,
      total,
      selectedSellerCompany,
      selectedBuyerCompany,
      sellerLogo: formData.sellerLogo ? formData.sellerLogo.name : null,
      buyerLogo: formData.buyerLogo ? formData.buyerLogo.name : null,
    });

    // Reset the form after submission
    dispatch({ type: "RESET_FORM" });
    setCurrentStep(1);
    setTimeout(() => {
      setFormData({});
      setProductDetails([]); // Reset productDetails
      setselectedSellerCompany(null); // Reset selectedSellerCompany
      setSelectedBuyerCompany(null); // Reset selectedBuyerCompany
    }, 2000);
  };

  const renderProgress = () => {
    const steps = [
      { step: 1, label: "Seller Information" },
      { step: 2, label: "Buyer Information" },
      { step: 3, label: "Invoice Details" },
      { step: 4, label: "Shipping Information" },
      { step: 5, label: "Product Details" },
      { step: 6, label: "Payment Terms" },
      { step: 7, label: "Seller Bank Details" },
      { step: 8, label: "Buyer Bank Details" },

      { step: 9, label: "Review & Submit" },
    ];

    return (
      <div className="progress-indicator">
        {steps.map(({ step, label }) => (
          <div
            key={step}
            className={`step-indicator ${
              currentStep >= step + 1 ? "active" : ""
            }`}
          >
            <div className="circle">
              {" "}
              {step === 9 ? (
                <span>&#10003;</span> // Display tick for Step 10
              ) : (
                step
              )}
            </div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>
    );
  };
  const renderFormFields = () => {
    switch (currentStep) {
      case 2:
        return (
          <>
            <h6>Seller/Shipper/Exporter/Supplier Information</h6>
            <Form.Group
              className="formgroupk mb-3 h-150"
              htmlFor="formSellerDocument"
            >
              <Form.Label>Attach Performa Invoice</Form.Label>
              <Form.Control
                type="file"
                name="sellerDocument"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="formgroupk h-150" htmlFor="companySelect">
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

              <Button
                className="mt-3 px-0 bg-transparent text-primary text-decoration-underline border-0 pb-0"
                variant="primary"
                onClick={() => handleAddnewCompany("seller")}
              >
                Add new Company
              </Button>
            </Form.Group>

            <Form.Group className="formgroupk mb-3" htmlFor="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="sellerAddress"
                value={formData.sellerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerCityStateZIP"
            >
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="sellerCityStateZIP"
                value={formData.sellerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerCountry">
              <Form.Label>Country</Form.Label>

              {/* <Select
                options={countries}
                value={countries.find(
                  (country) => country.value === formData.sellerCountryCode
                )}
                onChange={handleCountrySelect}
                placeholder="Select a country"
              /> */}
              <Select
                options={countries}
                value={
                  formData.sellerCountryCode
                    ? countries.find(
                        (country) =>
                          country.value === formData.sellerCountryCode
                      )
                    : null
                }
                onChange={(option) =>
                  handleCountrySelect(option, "sellerCountryCode")
                }
                placeholder="Select a country"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerPhone">
              <Form.Label>Phone</Form.Label>

              <PhoneInput
                international
                defaultCountry={formData.sellerCountryCode} // Set default country if needed
                value={formData.sellerPhone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="sellerEmail"
                value={formData.sellerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerWebsite">
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

            <Form.Group
              className="formgroupk h-150"
              htmlFor="buyerCompanySelect"
            >
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
              <Button
                className="mt-3 px-0 bg-transparent text-primary text-decoration-underline border-0 pb-0"
                variant="primary"
                onClick={() => handleAddnewCompany("buyer")}
              >
                Add new Company
              </Button>
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3 h-150"
              htmlFor="formBuyerCityStateZIP"
            >
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="buyerCityStateZIP"
                value={formData.buyerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerCountry">
              <Form.Label>Country</Form.Label>

              <Select
                options={countries}
                value={
                  formData.buyerCountryCode
                    ? countries.find(
                        (country) => country.value === formData.buyerCountryCode
                      )
                    : null
                }
                onChange={handleBuyerCountrySelect}
                placeholder="Select a country"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerPhone">
              <Form.Label>Phone</Form.Label>

              <PhoneInput
                international
                defaultCountry={formData.buyerCountryCode} // Set default country if needed
                value={formData.buyerPhone}
                onChange={handleBuyerPhoneChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="buyerEmail"
                value={formData.buyerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerContactPerson"
            >
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Person Name"
                name="buyerContactPerson"
                value={formData.buyerContactPerson || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3  w-100"
              htmlFor="formBuyerAddress"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="buyerAddress"
                value={formData.buyerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </>
        );
      case 4:
        return (
          <>
            <h6>Invoice Details</h6>
            <Form.Group className="formgroupk mb-3" htmlFor="formInvoiceNumber">
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
            <Form.Group className="formgroupk mb-3" htmlFor="formInvoiceDate">
              <Form.Label>Invoice Date</Form.Label>
              <Form.Control
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate || ""}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" controlId="formTolerance">
              <Form.Label>Tolerance ± %</Form.Label>
              <Form.Control
                type="number"
                name="tolerance"
                value={formData.tolerance || ""}
                onChange={handleFormChange}
                placeholder="Enter tolerance value"
              />
            </Form.Group>
          </>
        );
      case 5:
        return (
          <>
            <h6>Shipping Information</h6>
            <Form.Group className="formgroupk mb-3" htmlFor="formShipmentDate">
              <Form.Label>Expected Shipment Date</Form.Label>
              <Form.Control
                type="date"
                name="shipmentDate"
                value={formData.shipmentDate || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk"
              htmlFor="formPortOfLoadingCountry"
            >
              <Form.Label> Country of Origin</Form.Label>

              <Select
                value={countryOptions.find(
                  (option) => option.label === formData.portOfLoadingCountry
                )}
                onChange={(selectedOption) =>
                  handleShippingCountrySelect(
                    selectedOption,
                    "portOfLoadingCountry"
                  )
                }
                options={countryOptions}
              />
            </Form.Group>
            {formData.portOfLoadingCountry && (
              <Form.Group className="formgroupk" htmlFor="formPortOfLoading">
                <Form.Label>Port of Loading</Form.Label>

                {/* <Select
                  value={(
                    portOptions[formData.portOfLoadingCountry] || []
                  ).find((option) => option.label === formData.portOfLoading)}
                  onChange={(selectedOption) =>
                    handlePortSelect(selectedOption, "portOfLoading")
                  }
                  options={portOptions[formData.portOfLoadingCountry] || []}
                /> */}

                {/* <Select
                  value={(
                    portOptions[
                      countryList()
                        .getData()
                        .find(
                          (option) =>
                            option.label === formData.portOfLoadingCountry
                        )?.value
                    ] || []
                  ).find((option) => option.label === formData.portOfLoading)}
                  onChange={(selectedOption) =>
                    handlePortSelect(selectedOption, "portOfLoading")
                  }
                  options={
                    portOptions[
                      countryList()
                        .getData()
                        .find(
                          (option) =>
                            option.label === formData.portOfLoadingCountry
                        )?.value
                    ] || []
                  }
                /> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Port of Loading"
                  name="portOfLoading"
                  value={formData.portOfLoading || ""}
                  onChange={handleFormChange}
                />
              </Form.Group>
            )}
            <Form.Group
              className="formgroupk"
              htmlFor="formPortOfDischargeCountry"
            >
              <Form.Label> Country of Destination</Form.Label>
              {/* <Form.Control
                as="select"
                name="portOfDischargeCountry"
                value={formData.portOfDischargeCountry}
                onChange={handlePortCountryChange}
              >
                <option value="">Select Country</option>
                <option value="karachi">Karachi</option>
                <option value="uk">UK</option>
               
              </Form.Control>*/}
              <Select
                value={countryOptions.find(
                  (option) => option.label === formData.portOfDischargeCountry
                )}
                onChange={(selectedOption) =>
                  handleShippingCountrySelect(
                    selectedOption,
                    "portOfDischargeCountry"
                  )
                }
                options={countryOptions}
              />
            </Form.Group>
            {formData.portOfDischargeCountry && (
              <Form.Group className="formgroupk" htmlFor="formPortOfDischarge">
                <Form.Label>Port of Discharge</Form.Label>

                {/* <Select
                  value={(
                    portOptions[formData.portOfDischargeCountry] || []
                  ).find((option) => option.label === formData.portOfDischarge)}
                  onChange={(selectedOption) =>
                    handlePortSelect(selectedOption, "portOfDischarge")
                  }
                  options={portOptions[formData.portOfDischargeCountry] || []}
                /> */}
                {/* <Select
                  value={(
                    portOptions[
                      countryList()
                        .getData()
                        .find(
                          (option) =>
                            option.label === formData.portOfDischargeCountry
                        )?.value
                    ] || []
                  ).find((option) => option.label === formData.portOfDischarge)}
                  onChange={(selectedOption) =>
                    handlePortSelect(selectedOption, "portOfDischarge")
                  }
                  options={
                    portOptions[
                      countryList()
                        .getData()
                        .find(
                          (option) =>
                            option.label === formData.portOfDischargeCountry
                        )?.value
                    ] || []
                  }
                /> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Port of Discharge"
                  name="portOfDischarge"
                  value={formData.portOfDischarge || ""}
                  onChange={handleFormChange}
                />
              </Form.Group>
            )}
            <Form.Group className="formgroupk mb-3" htmlFor="formIncoterms">
              <Form.Label>Incoterms</Form.Label>

              <Form.Select
                aria-label="Incoterms"
                name="incoterms"
                value={formData.incoterms || ""}
                onChange={handleFormChange}
              >
                <option value="">Select Incoterms</option>
                <option value="EXW">EXW</option>
                <option value="FCA">FCA</option>
                <option value="CPT">CPT</option>
                <option value="CIP">CIP</option>
                <option value="DAP">DAP</option>
                <option value="DPU">DPU (replaces DAT)</option>
                <option value="DDP">DDP</option>
                <option value="FAS">FAS</option>
                <option value="FOB">FOB</option>
                <option value="CFR">CFR</option>
                <option value="CIF">CIF</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="formgroupk mb-3" htmlFor="formCarrier">
              <Form.Label>Carrier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Carrier Name"
                name="carrier"
                value={formData.carrier || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk" htmlFor="formShippingType">
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
              <Form.Group className="formgroupk" htmlFor="formVolume">
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
              <Form.Group className="formgroupk" htmlFor="formContainerType">
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
            <Form.Group className="formgroupk" htmlFor="formShippingMode">
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
            <div className="formgroupk w-100 h-100">
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
                    <th>Actions</th>
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
                      <td className="d-flex gap-3">
                        <Button
                          variant="none"
                          size="sm"
                          onClick={() => handleEditProduct(index)}
                        >
                          <i className="bi bi-pencil-square text-success fs-5"></i>
                        </Button>{" "}
                        <Button
                          variant="none"
                          size="sm"
                          onClick={() => handleDeleteProduct(index)}
                        >
                          <i className="bi bi-trash3-fill text-danger fs-5"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>{productDetails.length + 1}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Form.Select
                          aria-label="Default select"
                          onChange={handleSelect}
                        >
                          <option>Select a Product</option>
                          {products.map((product, index) => (
                            <option key={index} value={product.id}>
                              {product.productName}
                            </option>
                          ))}
                        </Form.Select>
                        <Button
                          variant="primary"
                          className="fs-6 px-0 bg-transparent text-primary text-decoration-underline border-0 pb-0 w-150"
                          onClick={handleNewProductShow}
                        >
                          Add
                        </Button>
                      </div>
                      <Modal
                        show={showNewProduct}
                        onHide={handleNewProductClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add New Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ProductForm
                            closeModel={handleNewProductClose}
                            onFormSubmit={fetchProducts}
                          />
                        </Modal.Body>
                      </Modal>
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
              <Button variant="primary" className="my-3" onClick={addProduct}>
                Add Product to List
              </Button>
              <div className="my-3 d-flex gap-3">
                <div className="form-group d-flex gap-3 w-100">
                  <label className=" col-form-label">Subtotal</label>
                  <div className="w-100">
                    <input
                      type="number"
                      className="form-control"
                      value={subtotal}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group d-flex gap-3 w-100">
                  <label className=" col-form-label">Tax</label>
                  <div className="w-100">
                    <input
                      type="number"
                      className="form-control"
                      value={tax}
                      onChange={handleTaxChange}
                    />
                  </div>
                </div>
                <div className="form-group d-flex gap-3 w-100">
                  <label className=" col-form-label">Total</label>
                  <div className="w-100">
                    <input
                      type="number"
                      className="form-control"
                      value={total}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 7:
        return (
          <>
            <h6>Payment Terms</h6>
            <Form.Group className="formgroupk mb-3" htmlFor="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                type="text"
                placeholder="Payment Method (e.g., Wire Transfer, Letter of Credit)"
                name="paymentMethod"
                value={formData.paymentMethod || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formPaymentTerms">
              <Form.Label>Payment Terms</Form.Label>
              <Form.Control
                type="text"
                placeholder="Payment Terms (e.g., 50% advance, 50% upon delivery)"
                name="paymentTerms"
                value={formData.paymentTerms || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formCurrency">
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
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBankName"
            >
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="sellerBankName"
                value={formData.sellerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerAccountNumber"
            >
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="sellerAccountNumber"
                value={formData.sellerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerSWIFTCode"
            >
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="sellerSWIFTCode"
                value={formData.sellerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="sellerIBAN"
                value={formData.sellerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBankAddress"
            >
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
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="buyerBankName"
                value={formData.buyerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerAccountNumber"
            >
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="buyerAccountNumber"
                value={formData.buyerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerSWIFTCode"
            >
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="buyerSWIFTCode"
                value={formData.buyerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="buyerIBAN"
                value={formData.buyerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerBankAddress"
            >
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
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerCompanyName"
            >
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new company name"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" controlId="formSellerLogo">
              <Form.Label>Upload Seller Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e, "sellerLogo")}
              />
              {formData.sellerLogo && (
                <img
                  src={URL.createObjectURL(formData.sellerLogo)}
                  alt="Seller Logo"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="sellerAddress"
                value={formData.sellerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerCityStateZIP"
            >
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="sellerCityStateZIP"
                value={formData.sellerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerCountry">
              <Form.Label>Country</Form.Label>

              <Select
                options={countries}
                value={
                  formData.sellerCountryCode
                    ? countries.find(
                        (country) =>
                          country.value === formData.sellerCountryCode
                      )
                    : null
                }
                onChange={(option) =>
                  handleCountrySelect(option, "sellerCountryCode")
                }
                placeholder="Select a country"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="sellerPhone"
                value={formData.sellerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="sellerEmail"
                value={formData.sellerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerWebsite">
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
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBankName"
            >
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="sellerBankName"
                value={formData.sellerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerAccountNumber"
            >
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="sellerAccountNumber"
                value={formData.sellerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerSWIFTCode"
            >
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="sellerSWIFTCode"
                value={formData.sellerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="sellerIBAN"
                value={formData.sellerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBankAddress"
            >
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
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerCompanyName"
            >
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new company name"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" controlId="formBuyerLogo">
              <Form.Label>Upload Buyer Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e, "buyerLogo")}
              />
              {formData.buyerLogo && (
                <img
                  src={URL.createObjectURL(formData.buyerLogo)}
                  alt="Buyer Logo"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="buyerAddress"
                value={formData.buyerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerCityStateZIP"
            >
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="buyerCityStateZIP"
                value={formData.buyerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="buyerCountry"
                value={formData.buyerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="buyerPhone"
                value={formData.buyerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="buyerEmail"
                value={formData.buyerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerWebsite">
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
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                name="buyerBankName"
                value={formData.buyerBankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerAccountNumber"
            >
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Number"
                name="buyerAccountNumber"
                value={formData.buyerAccountNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerSWIFTCode"
            >
              <Form.Label>SWIFT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="SWIFT Code"
                name="buyerSWIFTCode"
                value={formData.buyerSWIFTCode || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formBuyerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="buyerIBAN"
                value={formData.buyerIBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerBankAddress"
            >
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
    <Modal
      show={show}
      onHide={onHidep}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
      className="mainmodelP"
    >
      <div className="stepindi">{renderProgress()}</div>
      <Modal.Header closeButton>
        <Modal.Title> {selectedInvoiceType}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="invoicMB">
        {currentStep === 1 ? (
          <>
            <h6>Seller/Shipper/Exporter/Supplier Information</h6>

            <Form.Group className="formgroupk" htmlFor="companySelect">
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

            {selectedSellerCompany === "addNew" ? (
              <>
                <Form.Group
                  className="formgroupk mt-3"
                  htmlFor="newCompanyName"
                >
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
                className="mt-3 px-0 bg-transparent text-primary text-decoration-underline border-0 pb-0"
                variant="primary"
                onClick={handleAddnewCompany}
              >
                Add new Company
              </Button>
            )}
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="sellerAddress"
                value={formData.sellerAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerCityStateZIP"
            >
              <Form.Label>City, State, ZIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, ZIP"
                name="sellerCityStateZIP"
                value={formData.sellerCityStateZIP || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="sellerCountry"
                value={formData.sellerCountry || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="sellerPhone"
                value={formData.sellerPhone || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="sellerEmail"
                value={formData.sellerEmail || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="sellerWebsite"
                value={formData.sellerWebsite || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <div className="mt-3 btndiv">
              {addsellercom && (
                <Button variant="success" onClick={handleAddCompany}>
                  Submit
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {renderFormFields()}
            {addsellercom ? (
              <Button
                variant="success addcombtn mt-auto mb-3"
                onClick={handleAddCompany}
              >
                Submit
              </Button>
            ) : AddBuyercom ? (
              <Button
                variant="success addcombtn mt-auto mb-3"
                onClick={handleAddCompany}
              >
                Submit
              </Button>
            ) : (
              <div className="mt-3 btndiv">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={prevStep}
                    className="me-2"
                  >
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
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FullWidthModal;
