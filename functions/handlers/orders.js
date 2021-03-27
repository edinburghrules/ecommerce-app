const { db } = require("../util/admin");
const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");
const firebase = require("firebase");

const API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(API_KEY);

const submitOrder = async (req, res) => {
  const order = req.body.orderDetails;
  try {
    // Add order to database
    const docRef = await db.collection("orders").add(order);

    let orderItems = "";

    order.lineItems.forEach((lineItem) => {
      orderItems += `<div>
        <img style="width: 50%; height: auto;" src=${lineItem.image} />
        <h2>Order Details:</h2>
        <h3>${lineItem.name}</h3>
        <p>£${lineItem.price}</p>
        <p>Size: ${lineItem.size}</p>
        <p>Order quantity: ${lineItem.qty}</p>
      </div>`;
    });

    // Send email
    const msg = {
      to: "seanadamson84@gmail.com",
      from: "seanjadamson@gmail.com",
      subject: `Your Apparel Order: ${docRef.id}`,
      html: `
      <div style="width: 100%; color: #333;">
        <h1> Thank you for your order, ${order.name}</h1>
        ${orderItems}
        <div>
            <h2>Shipping Address:</h2>
            <p>${order.shippingAddress.line1}, ${
        order.shippingAddress.city
      },  ${order.shippingAddress.postal_code}</p>
        </div>
        <div>
            <h2>Payment details:</h2>
            <p>Subtotal: £${order.totalPrice}</p>
            <p>Shipping: ${
              order.shipping === 0 ? "Free" : "£" + "" + order.shipping
            }</p>
            <p>Total: £${order.amount}</p>
            <p>Paid with card ending in ****${order.cardUsed.last4}</p>
        </div>
      </div>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("email sent");
      })
      .catch((err) => {
        console.log(err);
      });
    return res.status(200).send(docRef.id);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const getOrder = async (req, res) => {
  const orderId = req.body.orderId;
  // use order id to get order from firestore
  try {
    const docRef = db.collection("orders").doc(orderId);

    const doc = await docRef.get();

    if (doc.exists) {
      return res.status(200).json(doc.data());
    } else {
      return res.status(400).json({ error: "No such order, please try again" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const getAllOrders = async (req, res) => {
  const email = req.account.email;
  try {
    const orders = [];

    const querySnapshot = await db
      .collection("orders")
      .where("email", "==", email)
      .orderBy("created", 'desc')
      .get();

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err });
  }
};

module.exports = {
  submitOrder,
  getOrder,
  getAllOrders,
};
