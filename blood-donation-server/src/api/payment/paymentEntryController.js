const paymentModel = require("../../model/payment/paymentModel");

const paymentEntryController = async (req, res) => {
  const paymentData = new paymentModel(req.body);
  const email = req.query.email;
  try {
    if (req.decoded.email === email) {
      await paymentData.save();
      res.status(201).json({
        success: true,
        message: "Payment added successfully!",
      });
    } else {
      res.status(401).json({
        success: true,
        message: "unauthorized access",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding payment data inside database!",
    });
  }
};

module.exports = paymentEntryController;
