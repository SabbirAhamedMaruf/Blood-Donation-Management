const userModel = require("../../model/user/userModel");

const manageAllUser = async (req, res) => {
  const adminEmail = req.query.email;
  console.log(adminEmail);
  try {
    const result = await userModel.find();
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch {
    res.status(500).json({
        success:false,
        message:"An error occured!"
    })
  }
};

module.exports = manageAllUser;
