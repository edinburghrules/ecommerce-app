const { db } = require('../util/admin');

const getFavourites = async (req, res) => {
  const email = req.account.email;
  try {
    const favourites = [];

    const querySnapshot = await db
      .collection('accounts')
      .doc(email)
      .collection('favourites')
      .get();

    querySnapshot.forEach((doc) => favourites.push({ ...doc.data() }));

    return res.status(200).json(favourites);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

const addFavourite = async (req, res) => {
  const email = req.account.email;
  const product = req.body.product;
  try {
    await db
      .collection(`accounts/${email}/favourites`)
      .doc(`${product.id}_${product.color}`)
      .set({ ...product });

    return res.status(201).json({ success: 'Favourite added' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

const removeFavourite = async (req, res) => {
  const email = req.account.email;
  const product = req.body.product;
  try {
    await db
      .collection(`accounts/${email}/favourites`)
      .doc(`${product.id}_${product.color}`)
      .delete();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.code });
  }
};

module.exports = {
  getFavourites,
  addFavourite,
  removeFavourite,
};
