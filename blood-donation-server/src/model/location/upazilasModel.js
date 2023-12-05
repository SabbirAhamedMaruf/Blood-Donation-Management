const {model} = require("mongoose");
const upazilasSchema = require("../../schema/location/upazilas");
const upazilasModel = model("upazilas",upazilasSchema)
module.exports = upazilasModel;