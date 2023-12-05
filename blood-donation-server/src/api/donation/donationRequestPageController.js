const donationModel = require("../../model/donation/donationModel");
const donationRequestPageController = async (req, res) => {
  try {
    const result = await donationModel
      .find({ status: "pending"})
      .sort({ _id: -1 });
    res.status(201).json({
      success: true,
      message: "donation data fetched successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Error fetching donation data from database!",
    });
  }
};
module.exports = donationRequestPageController;
