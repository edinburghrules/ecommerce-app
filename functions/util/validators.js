const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateRegisterData = (newAccountData) => {
  let errors = {};

  if (isEmpty(newAccountData.email))
    errors.email = 'Please provide an email address';
  else if (!isEmail(newAccountData.email))
    errors.email = 'Please provide valid email address';

  if (isEmpty(newAccountData.firstName))
    errors.firstName = 'Please provide your first name';

  if (isEmpty(newAccountData.lastName))
    errors.lastName = 'Please provide your last name';

  if (isEmpty(newAccountData.password))
    errors.password = 'Please provide a password';

  if (isEmpty(newAccountData.confirmPassword))
    errors.confirmPassword = 'Please confirm your password';
  else if (newAccountData.password !== newAccountData.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignInData = (accountData) => {
  let errors = {};

  if (isEmpty(accountData.email)) errors.email = 'Please provide your email';
  else if (!isEmail(accountData.email))
    errors.email = 'Please provide valid email';

  if (isEmpty(accountData.password))
    errors.password = 'Please provide your password';

  return {
    valid: Object.keys(errors).length === 0 ? true : false,
    errors,
  };
};
