const { model } = require("mongoose");
const paymentSchema = require("../../schema/payment/paymnet");
const payment = model("payments", paymentSchema);
module.exports = payment;
