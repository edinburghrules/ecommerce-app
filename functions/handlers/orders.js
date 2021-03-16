const { db } = require("../util/admin");
const nodemailer = require("nodemailer");

const submitOrder = async (req, res) => {
  const order = req.body.orderDetails;
  try {
    // Add order to database
    const docRef = await db.collection("orders").add(order);

    // Send an order confirmation email to customer
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "quinton.hackett@ethereal.email", // generated ethereal user
        pass: "VNQW4MashVbVaZ1hnh", // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: `Your Apparel Order: ${docRef.id}`,
      text: `Thank you for your order`,
      html: `
      <div style="width: 100%; color: #333;">
        <h1> Thank you for your order, ${order.name}</h1>
        <div>
            <img style="width: 50%; height: auto;" src=${order.lineItems[0].image} />
            <h2>Order Details:</h2>
            <h3>${order.lineItems[0].name}</h3>
            <p>£${order.lineItems[0].price}</p>
            <p>Size: ${order.lineItems[0].size}</p>
            <p>Order quantity: ${order.lineItems[0].qty}</p>
        </div>
        <div>
            <h2>Shipping Address:</h2>
            <p>${order.shippingAddress.line1}, ${order.shippingAddress.city},  ${order.shippingAddress.postal_code}</p>
        </div>
        <div>
            <h2>Payment details:</h2>
            <p>Paid with card ending in ****${order.cardUsed.last4}</p>
        </div>
      </div>`,
    });

    console.log(nodemailer.getTestMessageUrl(info));

    // Return
    return res.status(200).json(docRef.id);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err });
  }
};

const getOrder = async (req, res) => {
  const orderId = req.body.orderId;
  // use order id to get order from firestore
  try {
    const docRef = db.collection("orders").doc(orderId);

    const doc = await docRef.get();

    if (doc.exists) {
      console.log(doc.data());
      return res.status(200).json(doc.data());
    } else {
      return res.status(400).json({ error: "No such order, please try again" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

module.exports = {
  submitOrder,
  getOrder,
};
