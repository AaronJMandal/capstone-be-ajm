const { modAppointment } = require("../handlers/modAppointment");

module.exports = async (req, res) => {
  if (req.method === "PATCH") {
    await modAppointment(req, res);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
