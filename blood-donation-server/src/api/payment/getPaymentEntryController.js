const paymentModel = require("../../model/payment/paymentModel");

const getPaymentEntryController = async (req, res) => {
  const email = req.query.email;
  try {
    if (req.decoded.email === email) {
      const result = await paymentModel.find({ email: email });
      res.status(201).json({
        success: true,
        data: result,
      });
    } else {
      res.status(401).json({
        success: true,
        message: "unauthorized access",
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      message: "An error occured!",
    });
  }
};

module.exports = getPaymentEntryController;
