const { Schema } = require("mongoose");

const districtsSchema = new Schema({
  district_id: {
    type: Number,
    requird: true,
  },
  name: {
    type: String,
    requird: true,
  },
});

module.exports = districtsSchema;
