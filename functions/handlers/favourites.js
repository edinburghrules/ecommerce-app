const { db } = require('../util/admin');

const getFavourites = async (req, res) => {
  let email = req.account.email;
  console.log(email);
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
  let email = req.account.email;
  let product = req.body.product;
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

module.exports = {
  getFavourites,
  addFavourite,
};
