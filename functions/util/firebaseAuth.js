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
    // Verifies account token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.account = decodedToken;
    return next();
  } catch (err) {
    console.error(err);
    if (err.code === 'auth/argument-error') {
      return res.status(403).json({ error: 'Unauthorized' });
    } else {
      return res.status(403).json({ err });
    }
  }
};

// Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyYjkxODJiMWI0NmNiN2ZjN2MzMTFlZTgwMjFhZDY1MmVlMjc2MjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS1jb21tZXJjZS1hcHAtOWI2NDkiLCJhdWQiOiJlLWNvbW1lcmNlLWFwcC05YjY0OSIsImF1dGhfdGltZSI6MTYxMTA3NDUyMSwidXNlcl9pZCI6IkliaUt2VDl1R2hXRFNEaGJNQ2Jvd1g0ZHNEaTEiLCJzdWIiOiJJYmlLdlQ5dUdoV0RTRGhiTUNib3dYNGRzRGkxIiwiaWF0IjoxNjExMDc0NTIxLCJleHAiOjE2MTEwNzgxMjEsImVtYWlsIjoic2VhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2VhbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.u3HOVHaBc6L_I-AuEStMfxWV02584555OuLpebXiZYHVMmxbxi0ajG_LLx9X5sKCE1MUMzextBTo6IGzAtVixoM4-oJ_vTwxxbgFQanM6lCZnorO68hPeuRafn6_l95xj_rCMJ9_4ztAV-QjGZ5mLC0U7HMPmr0hig-13QBDoHd5AyfAFurBI6GhJpLYU1Dn278ZJICF_RBVVwK4B5hQFItbXzLDqF8e-WQ42uX06W8la7JiOXsVjfWuFTGbQfXU8ltMpZoedykSESV1msV3qx6bGz4OLOaM1RjErN3l5W-_eDwr_KsBv7vGZb3ZZ9OL-v2ayv7W-waMr5502xleAg
