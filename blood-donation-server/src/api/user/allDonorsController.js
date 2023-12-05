const userModel = require("../../model/user/userModel");

const allDonorsController = async (req, res) => {
  try {
    const result =await userModel.find({ userType: "donor" });
    res.status(201).json({
      success: true,
      message: "donor information fetched successfully!",
      data: result,
    });
  } catch {
    res.status(501).json({
      success: true,
      message: "An error occured",
      data: result,
    });
  }
};

module.exports = allDonorsController;
