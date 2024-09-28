const { submitAppointment } = require("../handlers/submitAppointment");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    await submitAppointment(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
