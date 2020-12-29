const functions = require('firebase-functions');
var cors = require('cors');
const app = require('express')();
app.use(cors());

const firebaseAuth = require('./util/firebaseAuth');
const {
  register,
  signIn,
  resetPassword,
  getAuthenticatedAccount,
} = require('./handlers/accounts');

// Accounts routes
app.post('/register', register);
app.post('/signin', signIn);
app.post('/reset-password', resetPassword);
app.get('/account', firebaseAuth, getAuthenticatedAccount);

exports.api = functions.https.onRequest(app);
