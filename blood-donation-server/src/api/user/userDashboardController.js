const usermodel = require("../../model/user/userModel");

const userDashboardController = async (req, res) => {
  try {
    const currentUserEmail = req.query.email;
    const userData = await usermodel.findOne({ email: currentUserEmail });
    res.status(201).json({
      success: true,
      data: userData,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Error finding user information from database!",
    });
  }
};

module.exports = userDashboardController;
