const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateRegister(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  // data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.user_type = !isEmpty(data.user_type) ? data.user_type : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be more than 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }

  if (Validator.isEmpty(data.user_type)) {
    errors.user_type = "User type is required";
  }

  if (!Validator.equals(data.user_type, "provider")) {
    if (!Validator.equals(data.user_type, "seeker")) {
      errors.user_type = "User type is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
