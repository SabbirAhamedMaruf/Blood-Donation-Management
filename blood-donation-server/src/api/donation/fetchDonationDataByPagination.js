const donationModel = require("../../model/donation/donationModel");
const fetchDonationDataByPagination = async (req, res) => {
  const currentPage = req.query.currentpage;
  const catagory = req.query.catagory;
  const email = req.query.email;
  try {
    if (req.decoded.email === email) {
      const result = await donationModel
        .find({ requesteremail: email, status: catagory })
        .skip(currentPage * 3)
        .limit(3);
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
module.exports = fetchDonationDataByPagination;
