const donationModel = require("../../model/donation/donationModel");

const updateDonationDataController = async (req, res) => {
  try {
    const updatedDonationData = req.body;
    const donationDataId = req.query.donationDataId;
    const email = req.query.email;
    if (req.decoded.email === email) {
      const {
        requestername,
        requesteremail,
        recipientname,
        recipientdistrict,
        recipientupazila,
        bloodgroup,
        hospitalname,
        address,
        donationdate,
        donationtime,
        requestmessage,
      } = updatedDonationData;

      const result = await donationModel.updateOne(
        { _id: donationDataId },
        {
          $set: {
            requestername: requestername,
            requesteremail: requesteremail,
            recipientname: recipientname,
            recipientdistrict: recipientdistrict,
            recipientupazila: recipientupazila,
            bloodgroup: bloodgroup,
            hospitalname: hospitalname,
            address: address,
            donationdate: donationdate,
            donationtime: donationtime,
            requestmessag: requestmessage,
          },
        }
      );
      res.status(201).json({
        success: true,
        message: "Donation request information updated inside database!",
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

module.exports = updateDonationDataController;
