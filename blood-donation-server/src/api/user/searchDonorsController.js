const userModel = require("../../model/user/userModel");
const searchDonorsController = async (req, res) => {
  const bloodgroup = req.body.bloodgroup;
  const district = req.body.district;
  const upazila = req.body.upazila;

  try {
    const result = await userModel.find({
      bloodgroup: bloodgroup,
      district: district,
      upazila: upazila,
      userType: "donor",
    });
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

module.exports = searchDonorsController;
