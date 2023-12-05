const { Schema } = require("mongoose");

// user schema (client : registration page)

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  upazila: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
