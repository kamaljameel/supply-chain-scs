import { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const BusinessForm = forwardRef((props, ref) => {
  const initialFormData = {
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
    LCity: "",
    LCountry: "",
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
    BankAddress: null,
    isDeferredAccount: false,
    DeferredAccountNumberReference: null,
    Legal_Identifier_Label1: null,
    Legal_Identifier_Number1: null,
    Legal_Identifier_Label2: null,
    Legal_Identifier_Number2: null,
    Legal_Identifier_Label3: null,
    Legal_Identifier_Number3: null,
    Legal_Identifier_Label4: null,
    Legal_Identifier_Number4: null,
    Legal_Identifier_Label5: null,
    Legal_Identifier_Number5: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const abisolToken = localStorage.getItem("abisolToken");

  if (!abisolToken) {
    console.error("No token found.");
    return;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/business/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${abisolToken}`, // ✅ Send Token
          },
        }
      );

      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // Expose the `handleSubmit` function to the parent component
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div>
      <h1>Create Business</h1>
      <form>
        <div>
          <label>Business Name</label>
          <input
            type="text"
            name="BusinessName"
            value={formData.BusinessName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Business Email 1</label>
          <input
            type="email"
            name="BusinessEmail1"
            value={formData.BusinessEmail1 || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Billing Full Address</label>
          <textarea
            name="Billing_FullAddress"
            value={formData.Billing_FullAddress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Shipping Full Address</label>
          <textarea
            name="Shipping_FullAddress"
            value={formData.Shipping_FullAddress}
            onChange={handleChange}
          />
        </div>

        {/* Add the remaining fields here */}
        {Object.keys(initialFormData).map((key) => {
          if (
            [
              "BusinessName",
              "BusinessEmail1",
              "Billing_FullAddress",
              "Shipping_FullAddress",
            ].includes(key)
          ) {
            // Skip these fields as they are already added above
            return null;
          }
          return (
            <div key={key}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
              />
            </div>
          );
        })}

        {/* <button
          type="button"
          className="success addcombtn  mt-auto mb-3"
          onClick={handleSubmit}
        >
          Submit
        </button> */}
      </form>

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
});

export default BusinessForm;
