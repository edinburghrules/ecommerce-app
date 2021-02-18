const { db } = require("../util/admin");

const getProduct = async (req, res) => {
  const productId = req.body.productId;
  const collection = req.body.collection;

  try {
    const productsRef = db.collection(collection);
    const product = await productsRef.doc(productId).get();
    return res.status(200).json(product.data());
  } catch (err) {
    console.error(err);
  }
};

const getAllShoes = async (req, res) => {
  const collection = req.query.collection;
  const productsRef = db.collection(collection);
  const products = [];

  try {
    const querySnapshot = await productsRef.get();
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return res.status(201).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getShoesByCategory = async (req, res) => {
  const collection = req.query.collection;
  const category = req.query.category;
  const productsRef = db.collection(collection);
  const products = [];

  console.log(category);

  try {
    const querySnapshot = await productsRef
      .where("category", "==", category)
      .get();
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return res.status(201).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getShoesByFilter = async (req, res) => {
  const collection = req.query.collection;
  let category = req.query.category ? req.query.category : false;
  let colors = req.query.colors ? req.query.colors : false;
  let bestFor = req.query.bestfor ? req.query.bestfor : false;

  colors = colors && colors.split(",");
  bestFor = bestFor && bestFor.split(",");

  const productsRef = db.collection(collection);
  let products = [];

  // Queries
  const categoryWithColors = productsRef
    .where("category", "==", category)
    .where("colors", "array-contains-any", colors);

  const categoryWithBestFor = productsRef
    .where("category", "==", category)
    .where("bestfor", "array-contains-any", bestFor);

  const withColors = productsRef.where("colors", "array-contains-any", colors);

  const withBestFor = productsRef.where(
    "bestfor",
    "array-contains-any",
    bestFor
  );

  // Return products
  let querySnapshot;

  if (category) {
    if (colors && bestFor) {
      try {
        querySnapshot = await categoryWithColors.get();
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    } else if (bestFor) {
      try {
        querySnapshot = await categoryWithBestFor.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (colors) {
      try {
        querySnapshot = await categoryWithColors.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    }
  } else {
    if (colors && bestFor) {
      try {
        querySnapshot = await withColors.get();
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    } else if (bestFor) {
      try {
        querySnapshot = await withBestFor.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    } else if (colors) {
      try {
        querySnapshot = await withColors.get();
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    }
  }

  if (colors && bestFor) {
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    products = products.filter((product) => {
      return product.bestfor.some((bestfor) => bestFor.includes(bestfor));
    });

    return res.json(products);
  }

  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return res.json(products);
};

module.exports = {
  getAllShoes,
  getShoesByCategory,
  getShoesByFilter,
  getProduct,
};
