const { db } = require('../util/admin');

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

  try {
    const querySnapshot = await productsRef
      .where('category', '==', category)
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

// 1. get collection e.g. mens-shoes with all shoes that match color  .../api/products-category/?collection=mens-shoes&color=white&color=black
// 2. get collection e.g. mens-shoes with category e.g. hi-tops that match color .../api/products-category/?collection=mens-shoes&category=hi-tops&color=white
// collection parameter is needed, category is optional, colors is an object

// `/products-color/?collection=${collection}&colors=${colors}`

const getShoesByColor = async (req, res) => {
  const collection = req.query.collection;
  let category = req.query.category === undefined ? false : req.query.category;
  let colors = req.query.colors;

  console.log(category);

  colors = colors.split(',');

  // colors= ['a color', 'a color'] etc.

  const productsRef = db.collection(collection);
  const products = [];

  // if we have category and colors
  if (category && colors) {
    try {
      const querySnapshot = await productsRef
        .where('category', '==', category)
        .where('colors', 'array-contains-any', colors)
        .get();

      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });

      return res.json(products);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  } else if (colors) {
    try {
      const querySnapshot = await productsRef
        .where('colors', 'array-contains-any', colors)
        .get();

      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });

      return res.json(products);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  }
  return res.status(400).json(products);
};

module.exports = { getAllShoes, getShoesByCategory, getShoesByColor };
