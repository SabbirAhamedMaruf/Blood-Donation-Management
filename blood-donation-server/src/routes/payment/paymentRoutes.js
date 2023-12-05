const getPaymentEntryController = require("../../api/payment/getPaymentEntryController");
const paymentEntryController = require("../../api/payment/paymentEntryController");
const createPaymentIntentController = require("../../lib/payment/createPaymentIntentController");
const verifyToken = require("../../middleware/verifytoken");

const router = require("express").Router();

// creating payment cleint secret key
router.post("/create-payment-intent",createPaymentIntentController);

//  saving payment data on the database
router.post("/add-my-payment",verifyToken,paymentEntryController);

// getting all user payments
router.get("/get-all-user-payments",verifyToken,getPaymentEntryController);
module.exports = router;
