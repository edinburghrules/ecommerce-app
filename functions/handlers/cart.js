const { db } = require("../util/admin");

const getCart = async (req, res) => {
  const email = req.account.email;
  try {
    const cart = [];
    const querySnapshot = await db.collection(`accounts/${email}/cart`).get();
    querySnapshot.forEach((doc) => {
      cart.push(doc.data());
    });
    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const removeCart = async (req, res) => {
  const email = req.account.email;
  try {
    const ids = [];

    const querySnapshot = await db.collection(`accounts/${email}/cart`).get();

    querySnapshot.forEach((doc) => {
      ids.push(doc.id);
    });

    console.log(ids);

    ids.forEach(async (id) => {
      await db.collection(`accounts/${email}/cart`).doc(id).delete();
    });

    return res.status(200).json({ success: "Cart deleted" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err });
  }
};

const stockQty = async (product) => {
  const productRef = await db
    .collection(`${product.collection}`)
    .doc(`${product.id}`)
    .get();

  const productVariants = productRef.data().variants;

  const sizesInStock = productVariants.find(
    (variant) => variant.color === product.color
  );

  const productSize = sizesInStock.sizes.find(
    (item) => item.size === product.size
  );

  return productSize.stockQty;
};

const addToCartFromLocalStorage = async (req, res) => {
  const products = req.body.products;
  const email = req.account.email;
  try {
    products.forEach(async (product) => {
      try {
        const qtyInStock = await stockQty(product);

        const cartItemRef = db
          .collection(`accounts/${email}/cart`)
          .doc(`${product.id}_${product.color}_${product.size}`);

        const doc = await cartItemRef.get();

        if (doc.exists) {
          let newQty = doc.data().qty + 1;
          if (newQty <= qtyInStock) {
            cartItemRef.update({
              qty: newQty,
            });
            return res.status(200).json({ success: "Item added" });
          } else {
            return res.status(400).json({
              product: product,
              fail:
                "Sorry, there's not enough stock to increase quantity further",
            });
          }
        } else {
          await db
            .collection(`accounts/${email}/cart`)
            .doc(`${product.id}_${product.color}_${product.size}`)
            .set({
              ...product,
            });
        }

        return res.status(201).json({ success: "Added to cart" });
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const addToCart = async (req, res) => {
  const email = req.account.email;
  const product = req.body.product;

  try {
    const qtyInStock = await stockQty(product);

    const cartItemRef = db
      .collection(`accounts/${email}/cart`)
      .doc(`${product.id}_${product.color}_${product.size}`);

    const doc = await cartItemRef.get();

    if (doc.exists) {
      let newQty = doc.data().qty + 1;
      if (newQty <= qtyInStock) {
        cartItemRef.update({
          qty: newQty,
        });
        return res.status(200).json({ success: "Item added" });
      } else {
        return res.status(400).json({
          fail: "Sorry, there's not enough stock to increase quantity further",
        });
      }
    } else {
      await db
        .collection(`accounts/${email}/cart`)
        .doc(`${product.id}_${product.color}_${product.size}`)
        .set({
          ...product,
          qty: 1,
        });
    }
    return res.status(201).json({ success: "Added to cart" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const increaseQty = async (req, res) => {
  const email = req.account.email;
  const product = req.body.product;
  try {
    const qtyInStock = await stockQty(product);
    const doc = await db
      .collection(`accounts/${email}/cart`)
      .doc(`${product.id}_${product.color}_${product.size}`)
      .get();

    const newQty = doc.data().qty + 1;

    if (newQty <= qtyInStock) {
      await db
        .collection(`accounts/${email}/cart`)
        .doc(`${product.id}_${product.color}_${product.size}`)
        .update({
          qty: newQty,
        });
      return res.status(201).json({ success: "Qty increased" });
    } else {
      return res.status(400).json({
        fail: "Sorry, there's not enough stock to increase quantity further",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const decreaseQty = async (req, res) => {
  const email = req.account.email;
  const product = req.body.product;
  try {
    const doc = await db
      .collection(`accounts/${email}/cart`)
      .doc(`${product.id}_${product.color}_${product.size}`)
      .get();

    const newQty = doc.data().qty - 1;

    if (newQty >= 1) {
      await db
        .collection(`accounts/${email}/cart`)
        .doc(`${product.id}_${product.color}_${product.size}`)
        .update({
          qty: newQty,
        });
      return res.status(201).json({ success: "Qty decreased" });
    } else {
      await db
        .collection(`accounts/${email}/cart`)
        .doc(`${product.id}_${product.color}_${product.size}`)
        .delete();
      return res.status(201).json({ success: "Item deleted" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const deleteFromCart = async (req, res) => {
  const email = req.account.email;
  const product = req.body.product;
  try {
    await db
      .collection(`accounts/${email}/cart`)
      .doc(`${product.id}_${product.color}_${product.size}`)
      .delete();
    return res.status(201).json({ success: "Deleted from cart" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const getStockQty = async (req, res) => {
  const product = req.body.product;
  try {
    const productRef = await db
      .collection(`${product.collection}`)
      .doc(`${product.id}`)
      .get();

    const productVariants = productRef.data().variants;

    const sizesInStock = productVariants.find(
      (variant) => variant.color === product.color
    );

    const productSize = sizesInStock.sizes.find(
      (item) => item.size === product.size
    );

    return res.status(200).json(productSize.stockQty);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

module.exports = {
  getCart,
  removeCart,
  addToCartFromLocalStorage,
  addToCart,
  deleteFromCart,
  increaseQty,
  decreaseQty,
  getStockQty,
};
