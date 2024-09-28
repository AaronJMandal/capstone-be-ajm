const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const { submitAppointment } = require("./handlers/submitAppointment");
const { getAppointment } = require("./handlers/getAppointment");
const { modAppointment } = require("./handlers/modAppointment");
const { deleteAppointment } = require("./handlers/deleteAppointment");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const {
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_CLIENT_SECRET,
  REACT_APP_AUTH0_DOMAIN,
} = process.env;

// Endpoint to handle login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post(
      `https://${REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "password",
        username: email,
        password: password,
        client_id: REACT_APP_AUTH0_CLIENT_ID,
        client_secret: REACT_APP_AUTH0_CLIENT_SECRET,
        scope: "openid profile email",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token, id_token } = response.data;
    res.json({ accessToken: access_token, idToken: id_token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.error_description || "Login failed",
    });
  }
});

// Endpoint to handle signup
app.post("/api/signup", async (req, res) => {
  const { email, password, connection } = req.body;
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
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data?.message || "Signup failed" });
  }
});

app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the root path!");
});

// Mongo endpoints
app.get("/api/get-appointment/:email", require("./api/get-appointment"));
app.post("/book-appointment", submitAppointment);
app.patch("/mod-appointment", modAppointment);
app.delete("/del-appointment/:email", deleteAppointment);

app.options("*", cors(corsOptions));

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
