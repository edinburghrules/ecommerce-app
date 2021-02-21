const { db } = require("../util/admin");

const getProductReviews = async (req, res) => {
  const productId = req.body.productId;
  try {
    const reviews = [];

    const reviewsRef = db
      .collection("reviews")
      .doc(productId)
      .collection("customer_reviews");
    const querySnapshot = await reviewsRef.get();
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data());
    });

    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

module.exports = {
  getProductReviews,
};
