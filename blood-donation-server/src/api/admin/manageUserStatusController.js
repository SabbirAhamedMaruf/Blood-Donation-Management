const userModel = require("../../model/user/userModel");

const manageUserStatusController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const status = req.query.status;
    const email = req.query.email;
    if (req.decoded.email === email) {
      const result = await userModel.updateOne(
        { _id: userId },
        {
          $set: {
            status: status,
          },
        }
      );
      res.status(201).json({
        success: true,
        message: "User information updated inside database!",
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
      message: "Error updating user information inside database!",
    });
  }
};

module.exports = manageUserStatusController;
