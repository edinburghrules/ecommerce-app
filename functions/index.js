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
const { getMensShoes, getMensShoesByCategory } = require('./handlers/products');

app.get('/mens-shoes', getMensShoes);
app.get('/mens-shoes/category', getMensShoesByCategory);

exports.api = functions.https.onRequest(app);
