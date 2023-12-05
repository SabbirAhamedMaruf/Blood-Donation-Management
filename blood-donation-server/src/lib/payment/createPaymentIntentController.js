require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntentController = async (req, res) => {
  try{
    const { price } = req.body;
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  }
  catch{
    res.status(500).json({
      success: true,
      message: "payment unsecessfull!",
    });
  }
};

module.exports = createPaymentIntentController;
