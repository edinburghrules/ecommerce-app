const { admin, db } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateRegisterData,
  validateSignInData,
} = require('../util/validators');

const register = async (req, res) => {
  const newAccount = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateRegisterData(newAccount);

  if (!valid) return res.status(400).json(errors);

  try {
    const createdAccount = await firebase
      .auth()
      .createUserWithEmailAndPassword(newAccount.email, newAccount.password);
    const token = await createdAccount.user.getIdToken();
    const accountCredentials = {
      firstName: newAccount.firstName,
      lastName: newAccount.lastName,
      email: newAccount.email,
      joined: new Date().toISOString(),
      accountId: createdAccount.user.uid,
    };
    await db
      .collection('accounts')
      .doc(newAccount.email)
      .set({
        ...accountCredentials,
      });
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    if (err.code === 'auth/email-already-in-use') {
      return res
        .status(400)
        .json({ email: 'Email already registered to an account' });
    } else {
      return res.status(500).json({ error: err.code });
    }
  }
};

const signIn = async (req, res) => {
  const account = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignInData(account);

  if (!valid) return res.status(400).json(errors);

  try {
    const signedInAccount = await firebase
      .auth()
      .signInWithEmailAndPassword(account.email, account.password);

    const token = await signedInAccount.user.getIdToken();

    return res.status(201).json(token);

  } catch (err) {
    console.error(err);

    if (err.code === 'auth/wrong-password') {
      return res.status(400).json({ password: 'Incorrect password' });
    } else if (err.code === 'auth/user-not-found') {
      return res.status(400).json({ email: 'Email not recognized' });
    } else {
      return res.status(500).json({ error: err.code });
    }
  }
};

const getAuthenticatedAccount = async (req, res) => {
  try {
    let accountData = {};
    const accountDataFromDb = await db
      .collection('accounts')
      .doc(req.account.email)
      .get();
    if (accountDataFromDb.exists) {
      accountData.credentials = accountDataFromDb.data();
      return res.json(accountData);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};

module.exports = { register, signIn, getAuthenticatedAccount };
