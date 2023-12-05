const userModel = require("../../model/user/userModel")

const userController = async (req, res) => {
  const newUserData = new userModel(req.body);
  try {
    await newUserData.save();
    res.status(201).json({
      success: true,
      message: "User added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding user inside database!",
    });
  }
};

module.exports = userController;
