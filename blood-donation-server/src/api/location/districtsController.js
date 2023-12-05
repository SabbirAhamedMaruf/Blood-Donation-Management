const districtsModel = require("../../model/location/districtsModel");

const districtsController = async (req, res) => {
  try {
    const district = await districtsModel.find();
    res.status(201).json({
      success: true,
      data: district,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting district data on database!",
    });
  }
};

module.exports = districtsController;
