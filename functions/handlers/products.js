const { admin, db } = require('../util/admin');

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

module.exports = { getAllShoes, getShoesByCategory };
