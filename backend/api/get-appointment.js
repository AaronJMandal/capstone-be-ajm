const { getAppointment } = require("../handlers/getAppointment");

module.exports = async (req, res) => {
  const { email } = req.params;

  req.params = { email };

  await getAppointment(req, res);
};
