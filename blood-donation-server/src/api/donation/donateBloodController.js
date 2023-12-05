const donationModel = require("../../model/donation/donationModel");

const donateBloodController = async (req, res) => {
  try {
    const updatedDonationData = req.body;
    const donationDataId = req.query.donationDataId;
    const { donorname, donoremail, status } = updatedDonationData;

    if (req.decoded.email === donoremail) {
      const result = await donationModel.updateOne(
        { _id: donationDataId },
        {
          $set: {
            donorname: donorname,
            donoremail: donoremail,
            status: status,
          },
        }
      );
      res.status(201).json({
        success: true,
        message: "Donor information updated inside database!",
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
      message: "Error updating donor information inside database!",
    });
  }
};

module.exports = donateBloodController;
