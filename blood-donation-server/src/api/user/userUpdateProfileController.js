const usermodel = require("../../model/user/userModel");

const userUpdateProfileController = async (req, res) => {
  try {
    const userUpdatedData = req.body;
    // verify token again
    const { name, photo, district, upazila, bloodgroup } = userUpdatedData;
    const userId = req.params.id;
    const result = await usermodel.updateOne(
      { _id: userId },
      {
        $set: {
          name: name,
          photo: photo,
          district: district,
          upazila: upazila,
          bloodgroup: bloodgroup,
        },
      }
    );
    res.status(201).json({
      success: true,
      message: "user information updated inside database!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Error updating user information from database!",
    });
  }
};

module.exports = userUpdateProfileController;
