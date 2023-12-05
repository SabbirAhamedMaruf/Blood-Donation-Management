const { model } = require("mongoose");
const districtsSchema = require("../../schema/location/districts");
const districts = model("districts", districtsSchema);
module.exports = districts;
