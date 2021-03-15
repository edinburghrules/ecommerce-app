const functions = require("firebase-functions");

const stripe = require("stripe")(functions.config().stripe.secretkey);

const getPaymentIntent = async (req, res) => {
  const amount = req.body.amount;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
    });
    return res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return res.status(405).end("Method not allowed");
  }
};

module.exports = {
  getPaymentIntent,
};
