const { admin } = require('./admin');

module.exports = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token present');
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log(decodedToken);
    const result = await db
      .collection('accounts')
      .where('userId', '==', req.user.uid)
      .limit(1)
      .get();
    req.user.email = result.docs[0].data().email;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ err });
  }
};
