import React, { useReducer, useEffect, useState, useRef } from "react";

import {
  Modal,
  Form,
  Button,
  Table,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import axios from "axios";
// import * as pdfjsLib from "pdfjs-dist/webpack"; // Change this import to webpack
// import { GlobalWorkerOptions } from "pdfjs-dist/webpack";
import {
  addProductApi,
  inquiryApi,
  addProductToListApi,
  createBusiness,
  getBusinesses,
  deleteBusiness,
  updateBusiness,
} from "@/utils/apiRoutes";
import ProductForm from "./ProductForm";
import Select from "react-select";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
// import BusinessForm from "../BusinessForm";

// import mammoth from "mammoth"; // For .doc and .docx handling
// import * as XLSX from "xlsx";

// Set the workerSrc to the PDF.js worker file
// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
    productID: 2,
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
  // addCompany,
  selectedInvoiceType,
  businessbutton,
  showMyProfile,
}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedSellerCompany, setselectedSellerCompany] = useState("");
  const [selectedBuyerCompany, setSelectedBuyerCompany] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [inquieryId, setInquireyId] = useState(null);
  const [showDAN, setShowDAN] = useState(false);
  // const businessFormRef = useRef();
  const [businesses, setBusinesses] = useState([]);
  const [editingBusiness, setEditingBusiness] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
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
    name: "",
    address: "",
    phone: "",
    email: "",
    tenantDomain: null,
    recordTitle: null,
    inquiryLine: "",
    inquiryID: 0,
    businessID: null,
    businessName: null,
    contactID: null,
    contactName: null,
    convertStatusName: null,
    description: null,
    engageStatusID: null,
    engageStatusName: null,
    estimatedDeliveryDate: null,
    estimatedRevenue: null,
    estimatedRevenueString: null,
    revenueCurrency: null,
    inquiryStatusID: null,
    inquiryStatusName: null,
    interestedInID: null,
    interestedInName: null,
    leadID: null,
    lead: null,
    nextFollowupDate: null,
    priorityID: null,
    priorityName: null,
    probabilityID: null,
    probabilityName: null,
    qualifyStatusID: null,
    qualifyStatusName: null,
    isDisabled: false,
    EORI: "",
    DAN: "",
    postcode: "",
    currency: "",

    AnnualRevenue: null,
    BusinessEmail1: null,
    BusinessEmail2: null,
    BusinessFax: null,
    BusinessName: "",
    BusinessPhone1: null,
    BusinessPhone2: null,
    BusinessRegNumber: null,
    BusinessTypeID: null,
    BusinessTypeName: null,
    EmployeesCount: null,
    IndustryID: null,
    Industry: null,
    LBuildingName: null,
    LCity: null,
    LCountry: null,
    LeadID: null,
    Lead: null,
    LPOBox: null,
    LPostCode: null,
    LState: null,
    LStreetNumber: null,
    LStreetType: null,
    LSuburb: null,
    LUnit_Level: null,
    Remarks: null,
    SBuildingName: null,
    SCountry: null,
    SPOBox: null,
    SPostCode: null,
    SState: null,
    SStreetNumber: null,
    SStreetType: null,
    SSuburb: null,
    SUnit_Level: null,
    Website: null,
    FileDisplayName_Logo: "",
    FileStorageName_Logo: "",
    FileURI_Logo: "",
    FileSize: 0.0,
    Billing_FullAddress: "",
    Shipping_FullAddress: "",
    BankName: null,
    AccountName: null,
    AccountNumber: null,
    SWIFTNumber: null,
    IBAN: null,
  });
  const [productDetails, setProductDetails] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const apiKey = "AIzaSyA5DS0UK5hhUa7g4hGBMjkOXLupWrmdFkY";
  // const [isSearchVisible, setIsSearchVisible] = useState(true);
  const abisolToken = localStorage.getItem("abisolToken");

  if (!abisolToken) {
    console.error("No token found.");
    return;
  }
  const [newProduct, setNewProduct] = useState({
    description: "",
    hsCode: "",
    origin: "",
    quantity: "",
    unitPrice: "",
    totalPrice: 0,
    ProductID: 0,
    netweight: 0,
    grossweight: 0,
  });

  // currencies
  const currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "ZAR", name: "South African Rand" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "KRW", name: "South Korean Won" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "THB", name: "Thai Baht" },
    // Add more currencies if needed
  ];
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setSelectedFile(file); // Store the selected file in state
  };
  console.log("productdetailsk", productDetails);
  // Handle file upload button click
  const handleFileUpload = async () => {
    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === "application/pdf") {
        const text = await extractTextFromPDF(selectedFile);
        setPdfText(text);
      } else if (
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "application/msword"
      ) {
        const text = await extractTextFromDoc(selectedFile);
        setPdfText(text);
      } else if (
        fileType === "application/vnd.ms-excel" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const text = await extractTextFromExcel(selectedFile);
        setPdfText(text);
      } else {
        console.error(
          "Unsupported file type. Please upload a PDF, DOC, DOCX, XLS, or XLSX file."
        );
      }

      if (pdfText) {
        await askQuestions(pdfText); // Automatically ask questions
        await extractProducts(pdfText); // Extract and add products
      }
    }
  };

  const handleCheckboxChange = () => {
    setShowDAN((prevShowDAN) => !prevShowDAN);
    if (!showDAN) {
      setFormData((prevData) => ({ ...prevData, DAN: "" })); // Clear DAN value when hiding
    }
  };
  // const extractTextFromPDF = async (file) => {
  //   const arrayBuffer = await file.arrayBuffer();
  //   const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  //   const pdf = await loadingTask.promise;
  //   let fullText = "";

  //   for (let i = 1; i <= pdf.numPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const textContent = await page.getTextContent();
  //     const pageText = textContent.items.map((item) => item.str).join(" ");
  //     fullText += pageText + " ";
  //   }

  //   return fullText;
  // };

  // Extract text from .doc and .docx using Mammoth
  // const extractTextFromDoc = async (file) => {
  //   const arrayBuffer = await file.arrayBuffer();
  //   const result = await mammoth.extractRawText({ arrayBuffer });
  //   return result.value; // Returns extracted text from the .doc/.docx file
  // };

  // Extract text from Excel files (.xls, .xlsx)
  // const extractTextFromExcel = async (file) => {
  //   const data = await file.arrayBuffer();
  //   const workbook = XLSX.read(data, { type: "array" });
  //   let extractedText = "";

  //   workbook.SheetNames.forEach((sheetName) => {
  //     const sheet = workbook.Sheets[sheetName];
  //     const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to JSON
  //     sheetData.forEach((row) => {
  //       extractedText += row.join(" ") + " "; // Concatenate rows into a single string
  //     });
  //   });

  //   return extractedText;
  // };
  // Automatically ask predefined questions and fill the form

  // Extract product details from the PDF text

  // Parse extracted product details

  // Auto add products one by one to the table

  // Send request to OpenAI API with the extracted PDF text and the user's question
  // const askChatGPT = async (pdfText, question) => {
  //   try {
  //     const prompt = `You are analyzing the following text from a PDF:\n\n${pdfText}\n\nQuestion: ${question}`;
  //     const response = await axios.post(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
  //       {
  //         contents: [
  //           {
  //             parts: [{ text: prompt }],
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // Extract the required data
  //     return (
  //       response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  //       "No content available"
  //     );
  //   } catch (error) {
  //     console.error("Error with ChatGPT API:", error);
  //     return "Error retrieving data";
  //   }
  // };
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
  const [pid, setpid] = useState("");
  const handleNewProductClose = () => setNewProductShow(false);
  const handleNewProductShow = () => setNewProductShow(true);
  const [selectedProduct, setSelectedProduct] = useState("");

  const fetchProducts = async () => {
    const abisolToken2 = localStorage.getItem("abisolToken");
    if (!abisolToken2) {
      console.error("No token found.");
      return;
    }

    try {
      const response = await axios.get(addProductApi, {
        headers: {
          Authorization: `bearer ${abisolToken2}`,
        },
      });
      setProducts(response.data);
      console.log("ddddttt", response.data);
      setpid(null);
      setSelectedProduct("");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchBusinesses = async () => {
    try {
      const response = await getBusinesses();
      setBusinesses(response.data);
    } catch (error) {
      console.error(
        "Error fetching businesses:",
        error.response?.data || error.message
      );
    }
  };
  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchBusinesses();
  }, []);

  // Handle delete business
  const handleDeleteBusiness = async (id) => {
    try {
      await deleteBusiness(id);
      fetchBusinesses(); // Refresh list
    } catch (error) {
      console.error(
        "Error deleting business:",
        error.response?.data || error.message
      );
    }
  };
  console.log("product idk", products);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [total, setTotal] = useState(0);
  const [TotalNetWeight, setTotalNetWeight] = useState(0);
  const [TotalGrossWeight, setTotalGrossWeight] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  // Calculate subtotal, tax, and total when product details change
  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = productDetails.reduce(
        (acc, product) => acc + product.totalPrice,
        0
      );

      const totalNetWeight = productDetails.reduce(
        (acc, product) => acc + (parseFloat(product.netweight) || 0),
        0
      );

      const totalGrossWeight = productDetails.reduce(
        (acc, product) => acc + (parseFloat(product.grossweight) || 0),
        0
      );

      const total = subtotal + parseFloat(tax || 0);
      setTotalNetWeight(totalNetWeight);
      setTotalGrossWeight(totalGrossWeight);
      setSubtotal(subtotal);
      setTotal(total);
    };

    calculateTotals();
  }, [productDetails, tax]);

  const handleSelect = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProduct(selectedProductId);
    // Check if selectedProductId is a valid selection
    if (!selectedProductId || selectedProductId === "Select a Product") {
      setNewProduct({
        description: "",
        hsCode: "",
        origin: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
        ProductID: selectedProductId,
        netweight: "",
        grossweight: "",
      });
      return; // Exit early if no valid selection is made
    }

    // Parse selectedProductId as a number if it's not already
    const parsedProductId = parseInt(selectedProductId);
    const selectedProduct = products.find(
      (product) => product.ProductID === parsedProductId
    );
    setpid(selectedProduct);
    // Find the selected product by id
    console.log("pid01", pid);
    console.log("slectedprdut01", selectedProduct);
    if (selectedProduct) {
      setNewProduct({
        // description: selectedProduct.productDescription || "",
        description: selectedProduct.Name || "",

        hsCode: selectedProduct.Code_SKU || "",
        origin: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
        ProductID: selectedProduct.ProductID,
        netweight: selectedProduct.Weight,
        grossweight: "",
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
        inquiryLine: `PIN-${Date.now()}`, // Simple auto-generated invoice number
        invoiceDate: currentDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        dueDate: dueDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      }));
    }
  }, [show]);

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
    setFormData((prevData) => {
      const { businessID, sequenceNumber } = generateBusinessID(prevData);
      return {
        ...prevData,
        businessID,
        sequenceNumber, // Save the sequence number
      };
    });
  };
  const generateBusinessID = (prevData) => {
    const currentYear = new Date().getFullYear();
    const nextSequence = (prevData.sequenceNumber || 0) + 1;
    const newBusinessID = `GB-${prevData.EORI}-${currentYear}-${String(
      nextSequence
    ).padStart(3, "0")}`;

    return {
      businessID: newBusinessID,
      sequenceNumber: nextSequence,
    };
  };
  useEffect(() => {
    if (show && businessbutton) {
      console.log("full width show ppp", businessbutton);
      setselectedSellerCompany("addNew");
      setCurrentStep(10);
      setAddsellercom(true);
      setFormData((prevData) => {
        const { businessID, sequenceNumber } = generateBusinessID(prevData);
        return {
          ...prevData,
          businessID,
          sequenceNumber, // Save the sequence number
        };
      });
    }
  }, [show, businessbutton]);
  useEffect(() => {
    if (currentStep === 10 || currentStep === 11) {
      setIsAddingNewForm(true);
    } else {
      setIsAddingNewForm(false);
    }
  }, [currentStep]);
  const onHidep = () => {
    if (!businessbutton) {
      if (currentStep === 11) {
        setCurrentStep(3);
      } else {
        setCurrentStep(2);
      }

      setAddsellercom(false);
      setAddBuyercom(false);
    } else {
      onHide();
    }
    if (isAddingNewForm) {
      // Prevent modal from closing if a new form is being added
      return;
    }
    onHide();
  };
  const addCompany = (newCompany) => {
    setBusinesses((prevOptions) => [...prevOptions, newCompany]);
  };
  // Handle change in tax percentage
  const handleTaxPercentageChange = (e) => {
    const newPercentage = e.target.value;
    setTaxPercentage(newPercentage);

    const calculatedTax = (subtotal * newPercentage) / 100;
    setTax(calculatedTax); // Update tax based on percentage
  };

  // Handle change in tax amount field
  const handleTaxChange = (e) => {
    const newTax = e.target.value;
    setTax(newTax);

    const calculatedPercentage = (newTax / subtotal) * 100;
    setTaxPercentage(calculatedPercentage); // Update percentage based on tax amount
  };
  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      if (editingBusiness) {
        // Update existing business
        await updateBusiness(editingBusiness.BusinessID, formData);
        setEditingBusiness(null); // Clear editing mode
        fetchBusinesses();
        setFormData({
          AnnualRevenue: null,
          BusinessEmail1: null,
          BusinessEmail2: null,
          BusinessFax: null,
          BusinessName: "",
          BusinessPhone1: null,
          BusinessPhone2: null,
          BusinessRegNumber: null,
          BusinessTypeID: null,
          BusinessTypeName: null,
          EmployeesCount: null,
          IndustryID: null,
          Industry: null,
          LBuildingName: null,
          LCity: null,
          LCountry: null,
          LeadID: null,
          Lead: null,
          LPOBox: null,
          LPostCode: null,
          LState: null,
          LStreetNumber: null,
          LStreetType: null,
          LSuburb: null,
          LUnit_Level: null,
          Remarks: null,
          SBuildingName: null,
          SCountry: null,
          SPOBox: null,
          SPostCode: null,
          SState: null,
          SStreetNumber: null,
          SStreetType: null,
          SSuburb: null,
          SUnit_Level: null,
          Website: null,
          FileDisplayName_Logo: "",
          FileStorageName_Logo: "",
          FileURI_Logo: "",
          FileSize: 0.0,
          Billing_FullAddress: "",
          Shipping_FullAddress: "",
          BankName: null,
          AccountName: null,
          AccountNumber: null,
          SWIFTNumber: null,
          IBAN: null,
        });
      } else {
        // Create new business
        await createBusiness(formData);
        fetchBusinesses();
        setFormData({
          AnnualRevenue: null,
          BusinessEmail1: null,
          BusinessEmail2: null,
          BusinessFax: null,
          BusinessName: "",
          BusinessPhone1: null,
          BusinessPhone2: null,
          BusinessRegNumber: null,
          BusinessTypeID: null,
          BusinessTypeName: null,
          EmployeesCount: null,
          IndustryID: null,
          Industry: null,
          LBuildingName: null,
          LCity: null,
          LCountry: null,
          LeadID: null,
          Lead: null,
          LPOBox: null,
          LPostCode: null,
          LState: null,
          LStreetNumber: null,
          LStreetType: null,
          LSuburb: null,
          LUnit_Level: null,
          Remarks: null,
          SBuildingName: null,
          SCountry: null,
          SPOBox: null,
          SPostCode: null,
          SState: null,
          SStreetNumber: null,
          SStreetType: null,
          SSuburb: null,
          SUnit_Level: null,
          Website: null,
          FileDisplayName_Logo: "",
          FileStorageName_Logo: "",
          FileURI_Logo: "",
          FileSize: 0.0,
          Billing_FullAddress: "",
          Shipping_FullAddress: "",
          BankName: null,
          AccountName: null,
          AccountNumber: null,
          SWIFTNumber: null,
          IBAN: null,
        });
      }

      setResponse(res.data);

      fetchBusinesses(); // Refresh list
    } catch (err) {
      setError(err.response?.data || err.message);
    }
    if (!businessbutton) {
      addCompany(formData.BusinessName);
      if (selectedBuyerCompany === "addNew") {
        setSelectedBuyerCompany(newCompany);
        setCurrentStep(2);
        setAddBuyercom(false);
      } else {
        setselectedSellerCompany(newCompany);
        setCurrentStep(2);
        setAddsellercom(false);
      }
      // if (businessFormRef.current) {
      //   businessFormRef.current.handleSubmit(); // Trigger the form submit in the child
      //   console.log("Child form submitted");
      // }
      setError(null);
      setResponse(null);

      setNewCompany("");
      setCurrentStep(2);
      setAddsellercom(false);
      setAddBuyercom(false);
    }
  };

  // const handleCompanySelect = (selectedBusinessID) => {
  //   const selectedBusiness = businesses.find(
  //     (business) => business.BusinessID === selectedBusinessID
  //   );

  //   if (selectedBusiness) {
  //     handleEditClick(selectedBusiness); // Call handleEditClick with the selected business
  //   } else {
  //     setFormData(); // Reset form if no company is selected
  //   }
  // };
  // const handleCompanySelect = (value) => {
  //   setselectedSellerCompany(value);
  //   // setEditingBusiness(value);
  //   console.log("akbar", businesses);
  //   setCurrentStep(2);
  // };
  const handleEditClick = (business) => {
    setEditingBusiness(business);
    setFormData(business);
    console.log("bsss", business);
  };
  const handleCompanySelect = (selectedBusinessName) => {
    const selectedBusiness = businesses.find(
      (business) => business.BusinessName === selectedBusinessName
    );
    if (selectedBusiness) {
      handleEditClick(selectedBusiness); // Call handleEditClick with the selected business
    } else {
      setFormData({}); // Reset the form if no company is selected
    }
  };
  // const handleFileChange = (file) => {
  //   // Define allowed file types
  //   const allowedTypes = [
  //     "application/pdf",
  //     "application/msword",
  //     "application/vnd.ms-excel",
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   ];

  //   if (file) {
  //     // Check file type
  //     if (!allowedTypes.includes(file.type)) {
  //       alert("Only PDF, DOC, and XLS files are allowed.");
  //       return;
  //     }

  //     // Optional: Check file size (e.g., 10 MB limit)
  //     if (file.size > 10 * 1024 * 1024) {
  //       alert("File size should not exceed 10 MB.");
  //       return;
  //     }

  //     // Update formData state with the selected file
  //     setFormData({
  //       ...formData,
  //       sellerDocument: file,
  //     });
  //   }
  // };

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
      // sellerCountry: selectedOption.label,
      LCountry: selectedOption.label,

      sellerCountryCode: countryCode,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      BusinessPhone1: value,
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
    const numericValue = parseFloat(value) || 0;
    if (name === "quantity" || name === "unitPrice") {
      updatedProduct.totalPrice =
        updatedProduct.quantity * updatedProduct.unitPrice;
    }

    if (name === "quantity") {
      const previousQuantity = parseFloat(newProduct.quantity) || 0;
      const currentNetweight = parseFloat(newProduct.netweight) || 0;

      // Calculate the change in quantity and adjust netweight
      const quantityDifference = numericValue - previousQuantity;
      updatedProduct.netweight = currentNetweight + quantityDifference;

      // Update the quantity
      updatedProduct.quantity = numericValue;
    }
    setNewProduct(updatedProduct);
  };
  // Handling port selection if the country has valid port options
  const handleEditProduct = (index) => {
    var productToEdit = productDetails[index];
    setNewProduct(productToEdit); // Populate the form with the product details
    setProductDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteProduct = (index) => {
    setProductDetails((prev) => prev.filter((_, i) => i !== index));
    setSubtotal(0);
    setTax(0);
    setTotal(0);
    setTotalGrossWeight(0);
    setTotalNetWeight(0);
    setTotalGrossWeight(0);
    setNewProduct({
      description: "",
      hsCode: "",
      origin: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      ProductID: 0,
      netweight: 0,
      grossweight: 0,
    });
    setSelectedProduct("");
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
  // const addProduct = () => {
  //   // setProductDetails([...productDetails, newProduct]);
  //   // // Reset newProduct state after adding
  //   // setNewProduct({
  //   //   description: "",
  //   //   hsCode: "",
  //   //   origin: "",
  //   //   quantity: "",
  //   //   unitPrice: "",
  //   //   totalPrice: 0,
  //   // });
  //   setProductDetails((prev) => [...prev, newProduct]);
  //   setNewProduct({
  //     description: "",
  //     hsCode: "",
  //     origin: "",
  //     quantity: 1,
  //     unitPrice: 0,
  //     totalPrice: 0,
  //   });
  //   dispatch({ type: "ADD_PRODUCT_DETAIL", productDetail: state.newProduct });
  //   dispatch({ type: "SET_NEW_PRODUCT", newProduct: initialState.newProduct });
  // };

  const addProduct = async () => {
    try {
      // Call the secondary API
      const payload = {
        inquiryID: inquieryId, // Replace this with dynamic inquiryID if required
        productID: newProduct?.ProductID, // Replace this with the actual product ID if it's available
        comments: newProduct?.comments || null,
        price: newProduct?.unitPrice || 0,
        quantity: newProduct?.quantity || 1,
        orderPreferenceDRSID: null, // Add this if you have any dynamic value for it
      };

      const response = await axios.post(addProductToListApi, payload);
      console.log("API Response product to list:", response.data);
      console.log("test19", newProduct);
    } catch (error) {
      console.error(
        "Error calling secondary API:",
        error?.response?.data || error.message
      );
    }

    // Add product details to state
    setProductDetails((prev) => [...prev, newProduct]);

    // Reset newProduct state after adding
    setNewProduct({
      description: "",
      hsCode: "",
      origin: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      ProductID: 0,
      netweight: 0,
      grossweight: 0,
    });

    // Dispatch actions to update context or global state
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

  const nextStep = async () => {
    if (currentStep === 4) {
      console.log("steppp 444");
      // Call the API when navigating to step 3
      try {
        const response = await axios.post(inquiryApi, formData);
        console.log("API response:", response.data);
        alert("Inquiry successfully created");
        setInquireyId(response.data.InquiryID);
      } catch (error) {
        console.error(
          "Error calling the API:",
          error?.response?.data || error.message
        );
        alert("Failed to submit inquiry.");
      }
    }

    setCurrentStep(currentStep + 1);
  };

  console.log("stored inquery id", inquieryId);
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
      TotalNetWeight,
      TotalGrossWeight,
      taxPercentage,
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

      { step: 6, label: "Seller Bank Details" },
      { step: 7, label: "Buyer Bank Details" },

      { step: 8, label: "Review & Submit" },
    ];

    return (
      <div>
        {showMyProfile ? (
          ""
        ) : (
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
        )}
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
                id="fileInput"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <button onClick={handleFileUpload}>Upload</button>
              {/* <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx"
      />
      <button onClick={handleFileUpload}>Upload</button> */}
              <div className="p-3">{pdfText}</div>
            </Form.Group>

            <Form.Group className="formgroupk h-150" htmlFor="companySelect">
              <Form.Label>Select Company</Form.Label>
              <Form.Control
                as="select"
                value={formData.BusinessName || ""}
                onChange={(e) => handleCompanySelect(e.target.value)}
              >
                <option value="">Select a company</option>
                {businesses.map((company) => (
                  <option key={company.BusinessID} value={company.BusinessName}>
                    {company.BusinessName}
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
                placeholder="Addressdd"
                name="Shipping_FullAddress"
                value={formData.Shipping_FullAddress || ""}
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
                value={formData.LCity || ""}
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
                  formData.LCountry
                    ? countries.find(
                        (country) =>
                          // country.value === formData.sellerCountryCode
                          country.value === formData.LCountry
                      )
                    : null
                }
                onChange={(option) => handleCountrySelect(option, "LCountry")}
                placeholder="Select a country"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerPhone">
              <Form.Label>Phone</Form.Label>

              <PhoneInput
                international
                defaultCountry={formData.sellerCountryCode} // Set default country if needed
                value={formData.BusinessPhone1 || ""}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="BusinessEmail1"
                value={formData.BusinessEmail1 || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="Website"
                value={formData.Website || ""}
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
                value={selectedBuyerCompany || ""}
                onChange={(e) => handleBuyerCompanySelect(e.target.value)}
              >
                <option value="">Select a company</option>
                {companyOptions.map((company, index) => (
                  <option key={index} value={company || ""}>
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
                value={formData.buyerPhone || ""}
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
                name="inquiryLine"
                value={formData.inquiryLine || ""}
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

            {/* <h6>Payment Terms</h6> */}
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
            <Form.Group className="formgroupk mb-3" controlId="formCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Select
                name="currency"
                value={formData.currency || ""}
                onChange={handleFormChange}
              >
                <option value="" disabled>
                  Select Currency
                </option>
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </Form.Select>
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
                value={formData.shippingType || ""}
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
                  value={formData.volume || ""}
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
                  value={formData.containerType || ""}
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
                value={formData.shippingMode || ""}
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
                    <th>Net weight</th>
                    <th>Gross weight</th>
                    <th>Unit Price({formData.currency})</th>
                    <th>Total Price({formData.currency})</th>
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
                      <td>{product.netweight}</td>
                      <td>{product.grossweight}</td>

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
                      <div className="d-flex ">
                        <Form.Select
                          aria-label="Default select"
                          onChange={handleSelect}
                          as="select"
                          value={selectedProduct || ""}
                        >
                          <option>Select a Product</option>
                          {products.map((product, index) => (
                            <option key={index} value={product.ProductID || ""}>
                              {product.Name}
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
                        <Button
                          onClick={handleNewProductShow}
                          className="fs-6 px-0 bg-transparent text-primary text-decoration-underline border-0 pb-0 "
                          disabled={!selectedProduct}
                        >
                          Edit
                        </Button>
                      </div>
                      <Modal
                        show={showNewProduct}
                        onHide={handleNewProductClose}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add New Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ProductForm
                            closeModel={handleNewProductClose}
                            onFormSubmit={fetchProducts}
                            productToEdit={pid}
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
                        type="text"
                        placeholder="Quantity"
                        name="quantity"
                        value={newProduct.quantity || ""}
                        onChange={handleProductChange}
                      />
                    </td>

                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Net weight"
                        name="netweight"
                        value={newProduct.netweight || ""}
                        onChange={handleProductChange}
                      />
                    </td>

                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Gross weight"
                        name="grossweight"
                        value={newProduct.grossweight || ""}
                        onChange={handleProductChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
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
                <div className="form-group  gap-3 w-100">
                  <label className=" col-form-label">Total Net Weight</label>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      value={TotalNetWeight || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group  gap-3 w-100">
                  <label className=" col-form-label">Total Gross Weight</label>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      value={TotalGrossWeight || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group  gap-3 w-100">
                  <label className=" col-form-label">Subtotal</label>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      value={subtotal || ""}
                      readOnly
                    />
                  </div>
                </div>
                {/* <div className="form-group d-flex gap-3 w-100">
                  <label className=" col-form-label">Tax</label>
                  <div className="w-100">
                    <input
                      type="number"
                      className="form-control"
                      value={tax}
                      onChange={handleTaxChange}
                    />
                  </div>
                </div> */}

                {/* Tax Percentage and Amount Fields */}
                <div className="form-group  gap-3 w-100">
                  <label className=" col-form-label">Tax</label>
                  <div className="d-flex">
                    <div className="col-sm-5 taxFild">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={taxPercentage || ""}
                        onChange={handleTaxPercentageChange}
                      />
                      <span className="m-0 fs-11">%</span>
                    </div>
                    <div className="col-sm-5 taxFild ms-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={tax || ""}
                        onChange={handleTaxChange}
                      />
                      <span className="m-0 fs-11">Amount</span>
                    </div>
                  </div>
                </div>
                <div className="form-group  gap-3 w-100">
                  <label className=" col-form-label">Total</label>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      value={total || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
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
            <h6>Business Details</h6>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerCompanyName"
            >
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="BusinessName"
                placeholder="Enter new company name"
                // value={newCompany || ""}
                // onChange={(e) => setNewCompany(e.target.value)}
                value={formData.BusinessName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" controlId="formSellerLogo">
              <Form.Label>Upload Seller Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e, "FileStorageName_Logo")}
              />
              {/* <img
                src={
                  formData.FileStorageName_Logo instanceof File
                    ? URL.createObjectURL(formData.FileStorageName_Logo)
                    : formData.FileStorageName_Logo // Use as-is if it's a URL
                }
                alt="Seller Logo"
                style={{ width: "100px", marginTop: "10px" }}
              /> */}
            </Form.Group>
            <Form.Group className="formgroupk mb-3" controlId="businessid">
              <Form.Label>Business ID</Form.Label>
              <Form.Control
                type="text"
                name="businessID"
                placeholder="Business ID"
                value={formData.businessID || null}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>

            <Form.Group className="formgroupk mb-3" htmlFor="formSellerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="Shipping_FullAddress"
                // value={formData.sellerAddress || ""}
                // onChange={handleFormChange}
                value={formData.Shipping_FullAddress || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerCityStateZIP"
            >
              <div className="d-flex gap-2">
                <div className="w-100">
                  <Form.Label>City, State, ZIP</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="City, State, ZIP"
                    name="LCity"
                    // value={formData.sellerCityStateZIP || ""}
                    value={formData.LCity || null}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-100">
                  <Form.Label>Post Code</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Post Code"
                    // name="postcode"
                    // value={formData.postcode || ""}
                    name="LPOBox"
                    value={formData.LPOBox || ""}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group className="formgroupk mb-3" htmlFor="formSellerCountry">
              <Form.Label>Country</Form.Label>

              <Select
                options={countries}
                value={
                  formData.LCountry
                    ? countries.find(
                        (country) =>
                          // country.value === formData.sellerCountryCode
                          country.value === formData.LCountry
                      )
                    : null
                }
                onChange={(option) => handleCountrySelect(option, "LCountry")}
                placeholder="Select a country"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerPhone">
              <Form.Label>Phone</Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Phone Number"
                name="sellerPhone"
                value={formData.sellerPhone || ""}
                onChange={handleFormChange}
              /> */}

              <PhoneInput
                international
                defaultCountry={formData.sellerCountryCode} // Set default country if needed
                // value={formData.sellerPhone || ""}
                value={formData.BusinessPhone1 || null}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                // name="sellerEmail"
                // value={formData.sellerEmail || ""}
                name="BusinessEmail1"
                value={formData.BusinessEmail1 || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="Website"
                // value={formData.sellerWebsite || ""}
                value={formData.Website || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="formgroupk mb-3" htmlFor="formSellervat">
              <Form.Label>EORI & VAT</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="EORI #"
                  name="EORI"
                  value={formData.EORI || ""}
                  onChange={handleFormChange}
                />

                <Form.Control
                  type="text"
                  placeholder="VAT #"
                  name="sellerWebsite"
                  // value={formData.sellerWebsite || ""}
                  // onChange={handleFormChange}
                />
              </div>
            </Form.Group>
            {/* new fields */}
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerAnnualRevenue"
            >
              <Form.Label>Annual Revenue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Annual Revenue"
                name="AnnualRevenue"
                value={formData.AnnualRevenue || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBusinessFax"
            >
              <Form.Label>Business Fax</Form.Label>
              <Form.Control
                type="text"
                placeholder="Business Fax"
                name="BusinessFax"
                value={formData.BusinessFax || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBusinessRegNumber"
            >
              <Form.Label>Business Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Business RegNumber"
                name="BusinessRegNumber"
                value={formData.BusinessRegNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerBusinessTypeName"
            >
              <Form.Label>Business TypeName</Form.Label>
              <Form.Control
                type="text"
                placeholder="BusinessTypeName"
                name="BusinessTypeName"
                value={formData.BusinessTypeName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerEmployeesCount"
            >
              <Form.Label>Employees Count</Form.Label>
              <Form.Control
                type="text"
                placeholder="Employees Count"
                name="EmployeesCount"
                value={formData.EmployeesCount || ""}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerIndustry"
            >
              <Form.Label>Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Industry"
                name="Industry"
                value={formData.Industry || ""}
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
                name="BankName"
                value={formData.BankName || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formSellerLAccountName"
            >
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Name"
                name="AccountName"
                value={formData.AccountName || ""}
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
                name="AccountNumber"
                value={formData.AccountNumber || ""}
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
                name="SWIFTNumber"
                value={formData.SWIFTNumber || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="IBAN"
                name="IBAN"
                value={formData.IBAN || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="formgroupk  mb-3"
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

            <div className={`formgroupk ${showDAN && "h-100"}`}>
              <Form.Check
                type="checkbox"
                label="Is Deferment Account?"
                onChange={handleCheckboxChange}
                checked={showDAN}
              />

              {showDAN && (
                <Form.Group className="w-100  mb-3">
                  <Form.Label className="fs-6">DAN#</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DAN#"
                    name="DAN"
                    value={formData.DAN || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              )}
            </div>
          </>
        );
      case 11:
        return (
          <>
            <h6>Business Details</h6>
            <Form.Group
              className="formgroupk mb-3"
              htmlFor="formBuyerCompanyName"
            >
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new company name"
                value={newCompany || ""}
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

              {/* <img
                src={
                  formData.FileStorageName_Logo instanceof File
                    ? URL.createObjectURL(formData.FileStorageName_Logo)
                    : formData.FileStorageName_Logo // Use as-is if it's a URL
                }
                alt="Seller Logo"
                style={{ width: "100px", marginTop: "10px" }}
              /> */}
            </Form.Group>

            <Form.Group className="formgroupk mb-3" controlId="businessid">
              <Form.Label>Business ID</Form.Label>
              <Form.Control
                type="text"
                name="businessID"
                placeholder="Business ID"
                value={formData.businessID || null}
                onChange={handleFormChange}
                readOnly
              />
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
              <div className="d-flex gap-2">
                <div className="w-100">
                  <Form.Label>City, State, ZIP</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="City, State, ZIP"
                    name="buyerCityStateZIP"
                    value={formData.buyerCityStateZIP || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-100">
                  <Form.Label>Post Code</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="post Code"
                    name="postcode"
                    value={formData.postcode || ""}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
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
                value={formData.buyerPhone || ""}
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
            <Form.Group className="formgroupk mb-3" htmlFor="formSellerWebsite">
              <Form.Label>EORI & VAT</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="EORI #"
                  name="EORI"
                  value={formData.EORI || ""}
                  onChange={handleFormChange}
                />

                <Form.Control
                  type="text"
                  placeholder="VAT #"
                  name="sellerWebsite"
                  // value={formData.sellerWebsite || ""}
                  // onChange={handleFormChange}
                />
              </div>
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
      <div className="stepindi">{!businessbutton && renderProgress()}</div>
      <Modal.Header closeButton>
        <Modal.Title>
          {addsellercom ? "" : AddBuyercom ? "" : selectedInvoiceType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="invoicMB">
        {currentStep === 1 ? (
          <>
            <h6>Seller/Shipper/Exporter/Supplier Information</h6>

            <Form.Group className="formgroupk" htmlFor="companySelect">
              <Form.Label>Select Company</Form.Label>
              <Form.Control
                as="select"
                value={formData.businessName}
                onChange={(e) => handleCompanySelect(e.target.value)} // Pass the selected BusinessID
              >
                <option value="">Select a company</option>
                {businesses.map((company) => (
                  <option
                    key={company.BusinessID}
                    value={company.BusinessID} // Use BusinessID as the value
                  >
                    {company.BusinessName}
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
                    value={newCompany || ""}
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
                name="Shipping_FullAddress"
                value={formData.Shipping_FullAddress || ""}
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
              <div className="w-100">
                <Button
                  variant="success addcombtn addbuyer mt-auto mb-3"
                  onClick={handleAddCompany}
                >
                  {editingBusiness ? "Update Business" : "Add Business"}
                </Button>
                <div className="overflow-x-auto w-100">
                  <h2 className="mb-3">Business List</h2>
                  <table className="min-w-full border-collapse border border-gray-300 w-100">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2 bg-greenC text-white text-center">
                          Business Name
                        </th>
                        <th className="border p-2 bg-greenC text-white text-center">
                          Email
                        </th>
                        <th className="border p-2 bg-greenC text-white text-center">
                          Phone
                        </th>
                        <th className="border p-2 bg-greenC text-white text-center">
                          Country
                        </th>
                        <th className="border p-2 bg-greenC text-white text-center">
                          Website
                        </th>

                        <th className="border p-2 bg-greenC text-white text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {businesses.map((business) => (
                        <tr key={business.id} className="border">
                          <td className="border p-2">
                            {business.BusinessName}
                          </td>
                          <td className="border p-2">
                            {business.BusinessEmail1}
                          </td>
                          <td className="border p-2">
                            {business.BusinessPhone1}
                          </td>

                          <td className="border p-2">{business.LCountry}</td>
                          <td className="border p-2">{business.Website}</td>

                          <td className="border p-2">
                            <Button
                              variant="none"
                              size="sm"
                              onClick={() => handleEditClick(business)}
                            >
                              <i className="bi bi-pencil-square text-success fs-5"></i>
                            </Button>{" "}
                            <Button
                              variant="none"
                              size="sm"
                              onClick={() =>
                                handleDeleteBusiness(business.BusinessID)
                              }
                            >
                              <i className="bi bi-trash3-fill text-danger fs-5"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : AddBuyercom ? (
              <Button
                variant="success addcombtn addseller mt-auto mb-3"
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
