const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const {
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_CLIENT_SECRET,
  REACT_APP_AUTH0_DOMAIN,
} = process.env;

const loginUser = async (req, res) => {
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
};

module.exports = { loginUser };
