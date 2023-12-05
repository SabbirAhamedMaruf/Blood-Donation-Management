const createTokenjwt = require("../../lib/authentication/createTokenjwt");

const authenticationControllerJwt = (req, res) => {
  try {
    const userEmail = req.body.email;
    // creating token
    const token = createTokenjwt(userEmail);
    res.send({ token });
  } catch {
    res.send({
      status: false,
      message: "error creating conection",
    });
  }
};

module.exports = authenticationControllerJwt;
