const donationModel = require("../../model/donation/donationModel");

const deleteDonationDataController = async (req, res) => {
  try {
    const email = req.query.email;
    const donationDataId = req.query.donationId;
    if (req.decoded.email === email) {
      const result = await donationModel.deleteOne({ _id: donationDataId });
      res.status(201).json({
        success: true,
        message: "Donation request information deleted from database!",
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
      message: "Error deleting donation information from database!",
    });
  }
};

module.exports = deleteDonationDataController;
