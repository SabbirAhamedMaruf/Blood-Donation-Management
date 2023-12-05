const donationModel = require("../../model/donation/donationModel");

const confrimdonationController = async (req, res) => {
  try {
    const donationId = req.query.donationId;
    const status = req.query.status;
    const email = req.query.email;
    if (req.decoded.email === email) {
      const result = await donationModel.updateOne(
        { _id: donationId },
        {
          $set: {
            status: status,
          },
        }
      );
      res.status(201).json({
        success: true,
        message: "Donation information updated inside database!",
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
      message: "Error updating donation information inside database!",
    });
  }
};

module.exports = confrimdonationController;
