const { signupUser } = require("../handlers/signupUser");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    await signupUser(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
