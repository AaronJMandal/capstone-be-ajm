const { loginUser } = require("../handlers/loginUser");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    await loginUser(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
