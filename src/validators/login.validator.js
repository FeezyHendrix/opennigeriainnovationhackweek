const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateLogin(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be more than 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
