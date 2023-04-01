const validatePassword = (password) => {
  let errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (password.length > 20) {
    errors.push("Password must be less than 20 characters long");
  }
  if (password.search(/\d/) === -1) {
    errors.push("Password must contain at least one number");
  }
  if (password.search(/[a-zA-Z]/) === -1) {
    errors.push("Password must contain at least one letter");
  }
  if (password.search(/[!@#$%^&*]/) === -1) {
    errors.push("Password must contain at least one special character");
  }
  return errors;
};

const validateUsername = (username) => {
  let errors = [];
  if (username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }
  if (username.length > 20) {
    errors.push("Username must be less than 20 characters long");
  }
  return errors;
};

const validateEmail = (email) => {
  let errors = [];
  if (email.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === -1) {
    errors.push("Email is not valid");
  }
  return errors;
};

export { validatePassword, validateUsername, validateEmail };
