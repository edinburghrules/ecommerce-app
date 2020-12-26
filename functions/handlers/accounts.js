const { admin, db } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateRegisterData,
  validateSignInData,
} = require('../util/validators');

const register = async (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateRegisterData(newUser);

  if (!valid) return res.status(400).json(errors);

  try {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    const token = await createdUser.user.getIdToken();
    const userCredentials = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      joined: new Date().toISOString(),
      userId: createdUser.user.uid,
    };
    await db
      .collection('accounts')
      .doc(createdUser.user.uid)
      .set({
        ...userCredentials,
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
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignInData(user);

  if (!valid) return res.status(400).json(errors);

  try {
    const signedInUser = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);

    const token = await signedInUser.user.getIdToken();

    return res.status(201).json(token);
  } catch (err) {
    console.error(err);
    if (err.code === 'auth/wrong-password') {
      return res.status(400).json({ password: 'Incorrect password' });
    } else if(err.code === 'auth/user-not-found') {
        return res.status(400).json({email: 'Email not recognized'})
    } else {
      return res.status(500).json({ error: err.code });
    }
  }
};

module.exports = { register, signIn };
