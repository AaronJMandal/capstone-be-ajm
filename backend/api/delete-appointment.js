const { deleteAppointment } = require("../handlers/deleteAppointment");

module.exports = async (req, res) => {
  if (req.method === "delete") {
    const { email } = req.params;

    req.params = { email };
    await deleteAppointment(req, res);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
