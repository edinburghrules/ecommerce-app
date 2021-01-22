const functions = require('firebase-functions');
var cors = require('cors');
const app = require('express')();
app.use(cors());

const firebaseAuth = require('./util/firebaseAuth');

// Accounts routes
const {
  register,
  signIn,
  resetPassword,
  getAuthenticatedAccount,
} = require('./handlers/accounts');

app.post('/register', register);
app.post('/signin', signIn);
app.post('/reset-password', resetPassword);
app.get('/account', firebaseAuth, getAuthenticatedAccount);

// Favourite routes
const {
  getFavourites,
  addFavourite,
  removeFavourite,
} = require('./handlers/favourites');

app.get('/get-favourites', firebaseAuth, getFavourites);
app.post('/add-favourite', firebaseAuth, addFavourite);
app.post('/remove-favourite', firebaseAuth, removeFavourite);

// Products routes
const {
  getAllShoes,
  getShoesByCategory,
  getShoesByFilter,
} = require('./handlers/products');

app.get('/products', getAllShoes);
app.get('/products-category', getShoesByCategory);
app.get('/filtered-products', getShoesByFilter);

exports.api = functions.https.onRequest(app);
