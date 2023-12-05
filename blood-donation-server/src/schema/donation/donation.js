const { Schema } = require("mongoose");

const donationSchema = new Schema({
  requestername: {
    type: String,
    required: true,
  },
  requesteremail: {
    type: String,
    required: true,
  },
  recipientname: {
    type: String,
    required: true,
  },
  recipientdistrict: {
    type: String,
    required: true,
  },
  recipientupazila: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  hospitalname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  donationdate: {
    type: String,
    required: true,
  },
  donationtime: {
    type: String,
    required: true,
  },
  requestmessage: {
    type: String,
    required: true,
  },
  donorname: {
    type: String,
    required: true,
  },
  donoremail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});


module.exports = donationSchema;