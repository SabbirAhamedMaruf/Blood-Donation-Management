const { Schema } = require("mongoose");

const upazilasSchema = new Schema({
  district_id: {
    type: Number,
    requird: true,
  },
  name: {
    type: String,
    requird: true,
  },
});

module.exports = upazilasSchema;