const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } = process.env;

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `https://${REACT_APP_AUTH0_DOMAIN}/dbconnections/signup`,
      {
        client_id: REACT_APP_AUTH0_CLIENT_ID,
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Signup failed",
    });
  }
};

module.exports = { signupUser };
