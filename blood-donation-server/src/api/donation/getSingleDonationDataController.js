const donationModel = require("../../model/donation/donationModel");
const getSingleDonationDataController = async (req, res) => {
  const currentDonationDataId = req.query.donationDataId;
  const email = req.query.email;

  try {
    if (req.decoded.email === email) {
      const result = await donationModel.findOne({
        _id: currentDonationDataId,
      });
      res.status(201).json({
        success: true,
        message: "donation data fetched successfully!",
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
      message: "Error fetching donation data from database!",
    });
  }
};
module.exports = getSingleDonationDataController;
