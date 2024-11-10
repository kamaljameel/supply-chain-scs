// import React, { useState } from "react";
// import axios from "axios";
// import * as pdfjsLib from "pdfjs-dist";
// import mammoth from "mammoth"; // For .doc and .docx handling
// import * as XLSX from "xlsx";
// // Component: ChatGPTWithProducts
// const ChatGPTWithProducts = () => {
//   const [pdfText, setPdfText] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     sellerName: "",
//     purchaserName: "",
//     selleraddress: "",
//     buyeraddress: "",
//     incoterm: "",
//   });
//   const [productFormData, setProductFormData] = useState({
//     productName: "",
//     quantity: "",
//     price: "",
//   });
//   const [products, setProducts] = useState([]);

//   // Dummy product options

//   const [productOptions, setProductOptions] = useState([
//     "Test1",
//     "Test2",
//     "Test3",
//     // Initial product options
//   ]);
//   // Replace with your OpenAI API key
//   const apiKey = "AIzaSyA5DS0UK5hhUa7g4hGBMjkOXLupWrmdFkY";

//   // Handle PDF upload and extract text
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file); // Store the selected file in state
//   };

//   // Handle file upload button click
//   const handleFileUpload = async () => {
//     if (selectedFile) {
//       const fileType = selectedFile.type;

//       if (fileType === "application/pdf") {
//         const text = await extractTextFromPDF(selectedFile);
//         setPdfText(text);
//       } else if (
//         fileType ===
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//         fileType === "application/msword"
//       ) {
//         const text = await extractTextFromDoc(selectedFile);
//         setPdfText(text);
//       } else if (
//         fileType === "application/vnd.ms-excel" ||
//         fileType ===
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       ) {
//         const text = await extractTextFromExcel(selectedFile);
//         setPdfText(text);
//       } else {
//         console.error(
//           "Unsupported file type. Please upload a PDF, DOC, DOCX, XLS, or XLSX file."
//         );
//       }

//       if (pdfText) {
//         await askQuestions(pdfText); // Automatically ask questions
//         await extractProducts(pdfText); // Extract and add products
//       }
//     }
//   };

//   // Extract text from PDF
//   const extractTextFromPDF = async (file) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
//     const pdf = await loadingTask.promise;
//     let fullText = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const textContent = await page.getTextContent();
//       const pageText = textContent.items.map((item) => item.str).join(" ");
//       fullText += pageText + " ";
//     }

//     return fullText;
//   };
//   // Extract text from .doc and .docx using Mammoth
//   const extractTextFromDoc = async (file) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const result = await mammoth.extractRawText({ arrayBuffer });
//     return result.value; // Returns extracted text from the .doc/.docx file
//   };

//   // Extract text from Excel files (.xls, .xlsx)
//   const extractTextFromExcel = async (file) => {
//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data, { type: "array" });
//     let extractedText = "";

//     workbook.SheetNames.forEach((sheetName) => {
//       const sheet = workbook.Sheets[sheetName];
//       const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to JSON
//       sheetData.forEach((row) => {
//         extractedText += row.join(" ") + " "; // Concatenate rows into a single string
//       });
//     });

//     return extractedText;
//   };
//   // Automatically ask predefined questions and fill the form
//   const askQuestions = async (pdfText) => {
//     const questions = [
//       { field: "sellerName", question: "What is the seller's name?" },
//       { field: "purchaserName", question: "What is the purchaser's name?" },
//       {
//         field: "selleraddress",
//         question:
//           "Give me the seller details from the document. Include name and address.",
//       },
//       {
//         field: "buyeraddress",
//         question: "Extract just the address from the purchaser details.",
//       },
//       {
//         field: "incoterm",
//         question: "What is the incoterm mentioned in the document?",
//       },
//     ];

//     for (const { field, question } of questions) {
//       const answer = await askChatGPT(pdfText, question);
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [field]: answer,
//       }));
//     }
//   };

//   // Extract product details from the PDF text
//   const extractProducts = async (pdfText) => {
//     const prompt = `You are analyzing the following text from a PDF:\n\n${pdfText}\n\nPlease extract all the products in the format: Product Name, Quantity, and Price, without any extra formatting or bullet points.`;

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
//         {
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // Extract the required data
//       const productsText =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No content available";
//       const cleanedProductsText = productsText.replace(
//         /\* \*\*(.*?)\*\*:/g,
//         ""
//       );
//       const extractedProducts = parseProducts(cleanedProductsText);
//       await autoAddProducts(extractedProducts); // Automatically add products
//     } catch (error) {
//       console.error("Error with ChatGPT API:", error);
//     }
//   };

//   // Parse extracted product details
//   const parseProducts = (productsText) => {
//     const productLines = productsText.split("\n").filter((line) => line.trim());
//     const productArray = productLines.map((line) => {
//       const [productName, quantity, price] = line
//         .split(",")
//         .map((item) => item.trim());
//       return { productName, quantity, price };
//     });
//     return productArray;
//   };

//   // Auto add products one by one to the table
//   const autoAddProducts = async (extractedProducts) => {
//     for (const product of extractedProducts) {
//       const { productName, quantity, price } = product;

//       // Clean the product name
//       const cleanedProductName = productName.replace(/\* \*\*(.*?)\*\*:/g, "");

//       // Check if product name exists in product options
//       const productExists = productOptions.includes(cleanedProductName);

//       if (!productExists) {
//         // Add the product to options first if not exist
//         await new Promise((resolve) => {
//           setProductOptions((prevOptions) => {
//             const updatedOptions = [...prevOptions, cleanedProductName];
//             resolve(updatedOptions); // Resolve after updating options
//             return updatedOptions;
//           });
//         });
//       }

//       // Add the product data to the product list after ensuring it's in options
//       const newProductData = {
//         productName: cleanedProductName,
//         quantity,
//         price,
//       };

//       setProducts((prevProducts) => [...prevProducts, newProductData]);
//       console.log("Automatically added product:", newProductData);
//     }
//   };

//   // Handle adding a product to the table
//   const handleAddProduct = () => {
//     // Check if product fields are not empty and product name is in options
//     if (
//       productFormData.productName &&
//       productFormData.quantity &&
//       productFormData.price &&
//       productOptions.includes(productFormData.productName)
//     ) {
//       setProducts((prevProducts) => [...prevProducts, productFormData]);
//       console.log("Button clicked: Product added", productFormData);

//       // Clear the product form after adding
//       setProductFormData({
//         productName: "",
//         quantity: "",
//         price: "",
//       });
//     } else {
//       console.error("Product name not found in options");
//     }
//   };

//   // Send request to OpenAI API with the extracted PDF text and the user's question
//   const askChatGPT = async (pdfText, question) => {
//     try {
//       const prompt = `You are analyzing the following text from a PDF:\n\n${pdfText}\n\nQuestion: ${question}`;
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
//         {
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // Extract the required data
//       return (
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No content available"
//       );
//     } catch (error) {
//       console.error("Error with ChatGPT API:", error);
//       return "Error retrieving data";
//     }
//   };

//   return (
//     <div>
//       <h1>Upload PDF and Auto-Fill Form with Products</h1>
//       <input
//         type="file"
//         id="fileInput"
//         onChange={handleFileChange}
//         accept=".pdf,.doc,.docx,.xls,.xlsx"
//       />
//       <button onClick={handleFileUpload}>Upload</button>
//       <div className="p-3">{pdfText}</div>

//       <h2>Seller and Purchaser Information</h2>
//       <form>
//         <div>
//           <label>Seller Name:</label>
//           <input
//             type="text"
//             value={formData.sellerName}
//             onChange={(e) =>
//               setFormData({ ...formData, sellerName: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>Purchaser Name:</label>
//           <input
//             type="text"
//             value={formData.purchaserName}
//             onChange={(e) =>
//               setFormData({ ...formData, purchaserName: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>seller Address:</label>
//           <input
//             type="text"
//             value={formData.selleraddress}
//             onChange={(e) =>
//               setFormData({ ...formData, selleraddress: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div>
//           <label>Buyer Address:</label>
//           <input
//             type="text"
//             value={formData.buyeraddress}
//             onChange={(e) =>
//               setFormData({ ...formData, buyeraddress: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>Incoterm:</label>
//           <input
//             type="text"
//             value={formData.incoterm}
//             onChange={(e) =>
//               setFormData({ ...formData, incoterm: e.target.value })
//             }
//             required
//           />
//         </div>
//       </form>

//       <h2>Add a Product</h2>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleAddProduct(); // Call the function on form submission
//         }}
//       >
//         <div>
//           <label>Product Name:</label>
//           <select
//             type="text"
//             value={productFormData.productName}
//             onChange={(e) =>
//               setProductFormData({
//                 ...productFormData,
//                 productName: e.target.value,
//               })
//             }
//             required
//           >
//             <option value="">Select a product</option>
//             {productOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input
//             type="number"
//             value={productFormData.quantity}
//             onChange={(e) =>
//               setProductFormData({
//                 ...productFormData,
//                 quantity: e.target.value,
//               })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             type="number"
//             value={productFormData.price}
//             onChange={(e) =>
//               setProductFormData({
//                 ...productFormData,
//                 price: e.target.value,
//               })
//             }
//             required
//           />
//         </div>
//         <button type="submit">Add Product</button>
//       </form>

//       <h2>Product Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={index}>
//               <td>{product.productName}</td>
//               <td>{product.quantity}</td>
//               <td>{product.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ChatGPTWithProducts;
import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Container, Button, Form as BootstrapForm } from "react-bootstrap";
import * as pdfjsLib from "pdfjs-dist/webpack";

const countries = ["USA", "Canada", "UK", "Australia", "Germany"]; // Add more countries
const incotermsOptions = ["EXW", "FOB", "CIF", "DDP"]; // Add more Incoterms options

export default function ChatGPTWithAutoQuestions() {
  const [formValues, setFormValues] = useState({
    sellerCompany: "",
    buyerCompany: "",
    phone: "",
    country: "",
    incoterms: "",
    products: [{ productName: "", quantity: "", price: "" }],
  });

  // Extract text using pdfjs-dist
  const handlePDFUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);

        // Load the PDF using pdfjs-dist
        const pdfDocument = await pdfjsLib.getDocument(typedArray).promise;

        // Get the first page
        const page = await pdfDocument.getPage(1);

        // Extract the text content from the page
        const textContent = await page.getTextContent();

        // Extract and join the text items
        let text = textContent.items.map((item) => item.str).join(" ");

        // Use regex or search for specific keywords to extract structured information
        const sellerRegex = /Seller:\s*(.+?)\s/;
        const buyerRegex = /Buyer:\s*(.+?)\s/;
        const phoneRegex = /Phone:\s*(\d+)/;
        const countryRegex = /Country:\s*(.+?)\s/;
        const incotermsRegex = /Incoterms:\s*(\b[A-Z]+\b)/;

        const sellerMatch = text.match(sellerRegex);
        const buyerMatch = text.match(buyerRegex);
        const phoneMatch = text.match(phoneRegex);
        const countryMatch = text.match(countryRegex);
        const incotermsMatch = text.match(incotermsRegex);

        setFormValues({
          sellerCompany: sellerMatch ? sellerMatch[1] : "",
          buyerCompany: buyerMatch ? buyerMatch[1] : "",
          phone: phoneMatch ? phoneMatch[1] : "",
          country: countryMatch ? countryMatch[1] : "",
          incoterms: incotermsMatch ? incotermsMatch[1] : "",
          products: [{ productName: "", quantity: "", price: "" }],
        });
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <Container>
      <h2>Upload Commercial Invoice</h2>
      <BootstrapForm.Group>
        <BootstrapForm.Label>Upload PDF</BootstrapForm.Label>
        <BootstrapForm.Control
          type="file"
          accept="application/pdf"
          onChange={handlePDFUpload}
        />
      </BootstrapForm.Group>

      <h3>Auto-filled Commercial Invoice Form</h3>
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={(values) => {
          console.log("Form data submitted:", values);
        }}
      >
        {({ values }) => (
          <Form>
            {/* Seller Information */}
            <BootstrapForm.Group>
              <BootstrapForm.Label>Seller Company</BootstrapForm.Label>
              <Field
                name="sellerCompany"
                type="text"
                className="form-control"
              />
            </BootstrapForm.Group>

            {/* Buyer Information */}
            <BootstrapForm.Group>
              <BootstrapForm.Label>Buyer Company</BootstrapForm.Label>
              <Field name="buyerCompany" type="text" className="form-control" />
            </BootstrapForm.Group>

            {/* Phone Number */}
            <BootstrapForm.Group>
              <BootstrapForm.Label>Phone</BootstrapForm.Label>
              <Field name="phone" type="text" className="form-control" />
            </BootstrapForm.Group>

            {/* Country Dropdown */}
            <BootstrapForm.Group>
              <BootstrapForm.Label>Country</BootstrapForm.Label>
              <Field name="country" as="select" className="form-control">
                <option value="">Select a Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Field>
            </BootstrapForm.Group>

            {/* Incoterms Dropdown */}
            <BootstrapForm.Group>
              <BootstrapForm.Label>Incoterms</BootstrapForm.Label>
              <Field name="incoterms" as="select" className="form-control">
                <option value="">Select Incoterms</option>
                {incotermsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            </BootstrapForm.Group>

            {/* Products Table */}
            <FieldArray name="products">
              {({ push, remove }) => (
                <div>
                  <h4>Products</h4>
                  {values.products.map((product, index) => (
                    <div key={index} className="d-flex mb-3">
                      <BootstrapForm.Group className="me-3">
                        <BootstrapForm.Label>Product Name</BootstrapForm.Label>
                        <Field
                          name={`products.${index}.productName`}
                          type="text"
                          className="form-control"
                        />
                      </BootstrapForm.Group>
                      <BootstrapForm.Group className="me-3">
                        <BootstrapForm.Label>Quantity</BootstrapForm.Label>
                        <Field
                          name={`products.${index}.quantity`}
                          type="number"
                          className="form-control"
                        />
                      </BootstrapForm.Group>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Price</BootstrapForm.Label>
                        <Field
                          name={`products.${index}.price`}
                          type="text"
                          className="form-control"
                        />
                      </BootstrapForm.Group>
                      <Button
                        variant="danger"
                        onClick={() => remove(index)}
                        className="ms-3"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="primary"
                    onClick={() =>
                      push({ productName: "", quantity: "", price: "" })
                    }
                  >
                    Add Product
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
