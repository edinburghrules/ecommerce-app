const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateRegisterData = (newUserData) => {
  let errors = {};

  if (isEmpty(newUserData.email))
    errors.email = 'Please provide an email address';
  else if (!isEmail(newUserData.email))
    errors.email = 'Please provide valid email address';

  if (isEmpty(newUserData.firstName))
    errors.firstName = 'Please provide your first name';

  if (isEmpty(newUserData.lastName))
    errors.lastName = 'Please provide your last name';

  if (isEmpty(newUserData.password))
    errors.password = 'Please provide a password';

  if (isEmpty(newUserData.confirmPassword))
    errors.confirmPassword = 'Please confirm your password';
  else if (newUserData.password !== newUserData.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignInData = (userData) => {
  let errors = {};

  if (isEmpty(userData.email)) errors.email = 'Please provide your email';
  else if (!isEmail(userData.email))
    errors.email = 'Please provide valid email';

  if (isEmpty(userData.password)) errors.password = 'Please provide your password';

  return {
    valid: Object.keys(errors).length === 0 ? true : false,
    errors,
  };
};
