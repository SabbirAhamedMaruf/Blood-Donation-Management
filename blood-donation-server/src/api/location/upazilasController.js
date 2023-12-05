const upazilasModel = require("../../model/location/upazilasModel");
const districtsModel = require("../../model/location/districtsModel");

const upazilasController = async (req, res) => {
  try {
    const userDistricts = req.query.userDistricts;
    districtsModel.findOne({ name: userDistricts }).then((result) => {
      upazilasModel
        .find({ district_id: result?.district_id })
        .then((upazilaResult) => {
          res.status(201).json({
            success: true,
            data: upazilaResult,
          });
        });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting district data on database!",
    });
  }
};

module.exports = upazilasController;
