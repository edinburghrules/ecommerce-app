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

const addProductReview = async (req, res) => {
  const review = req.body.review;
  console.log(review);
  try {
    await db
      .collection("reviews")
      .doc(review.itemId)
      .collection("customer_reviews")
      .add({
        content: review.reviewBody,
        date: review.date,
        name: review.customerName,
        rating: review.reviewRating,
        title: review.reviewTitle,
        itemId: review.itemId,
        orderId: review.orderReference,
      });

    const doc = await db.collection("orders").doc(review.orderReference).get();

    const matchingLineItems = doc
      .data()
      .lineItems.filter((lineItem) => lineItem.id === review.itemId);

    const nonMatchingLineItems = doc
      .data()
      .lineItems.filter((lineItem) => lineItem.id !== review.itemId);

    const markAsReviewed = matchingLineItems.map((lineItem) => {
      return { ...lineItem, reviewed: true };
    });

    const mergedLineItems = [...nonMatchingLineItems, ...markAsReviewed];

    await db.collection("orders").doc(review.orderReference).update({
      lineItems: mergedLineItems,
    });

    return res.status(200).json("Review added");
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

module.exports = {
  getProductReviews,
  addProductReview,
};
