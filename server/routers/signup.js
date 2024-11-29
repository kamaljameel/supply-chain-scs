const express = require("express");
const { createUser } = require("../controllers/userController");
const axios = require("axios");
const router = express.Router();

// Route to handle user registration
router.post("/", async (req, res) => {
  const { FirstName, LastName, Email, MobileNumber, Password, role } = req.body;

  try {
    // Create user in local database
    const user = await createUser({
      FirstName,
      LastName,
      Email,
      MobileNumber,
      Password,
      role,
    });

    // If user creation is successful, also post data to external API
    const data = {
      FirstName: FirstName || "",
      LastName: LastName || "",
      Email: Email || "",
      MobileNumber: MobileNumber || "",
      Password: Password || "",
    };
    // console.log(data);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.abisolcrm.com.au/v1/CreateCorporateUser",
      headers: {
        // "x-api-key": "f797e8f61eec4323b003bd2cca68c226",
        "x-api-key": "7d771e41bb5c449582122749df6bc0a3",
        // "Content-Type": "application/json",
      },
      data: data,
    };

    const externalResponse = await axios(config);

    console.log("Response from external API:", externalResponse.data);

    res.status(201).json({ user, externalResponse: externalResponse.data });
  } catch (error) {
    console.error("Error: ---> ", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
