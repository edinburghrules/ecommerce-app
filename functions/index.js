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

// Products routes
const {
  getAllShoes,
  getShoesByCategory,
  getShoesByFilter,
} = require('./handlers/products');

app.get('/products', getAllShoes);
app.get('/products-category', getShoesByCategory);

//api/products-color/?collection=mens-shoes&category=hi-tops&colors=black&colors=white
app.get('/filtered-products', getShoesByFilter);

exports.api = functions.https.onRequest(app);
