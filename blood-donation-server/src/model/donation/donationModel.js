const {model} = require("mongoose");
const donationSchema = require("../../schema/donation/donation");
const donations = model("blooddonations",donationSchema);

module.exports = donations;