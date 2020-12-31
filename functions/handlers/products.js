const { admin, db } = require('../util/admin');

const getMensShoes = async (req, res) => {
  const productsRef = db.collection('mens-shoes');
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

const getMensShoesByCategory = async (req, res) => {
  const category = req.query.category;
  const productsRef = db.collection('mens-shoes');
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


//black https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7b8k7jAF4b2Lzz42YpBYQO/1
// grey https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/1asfoA8T96201A3ODn2r4f/2
// navy https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_530,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/1bRf7x3NByrcpXwAMRReII/1

module.exports = { getMensShoes, getMensShoesByCategory };
