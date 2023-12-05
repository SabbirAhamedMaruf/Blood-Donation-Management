const usermodel = require("../../model/user/userModel");
const donationModel = require("../../model/donation/donationModel");
const paymentModel = require("../../model/payment/paymentModel");

const adminStatistics = async (req, res) => {
  const adminEmail = req.query.email;
  try {
    if (req.decoded.email === adminEmail) {
      const totalUser = await usermodel.countDocuments();
      const totalDonation = await donationModel.countDocuments();
      const payments = await paymentModel.find();
      let sum = 0;
      for (i = 0; i < payments.length; i++) {
        sum = sum + payments[i].amount;
      }

      const data = {
        totalUser: totalUser,
        totalDonation:totalDonation,
        sum:sum
      }

      res.status(201).json({
        success: true,
        message: "Admin statistics fetched successfully!",
        data:data
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
      message: "Error fetching admin statistics from database!",
    });
  }
};

module.exports = adminStatistics;
