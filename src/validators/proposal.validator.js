const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateProposals(data) {
  let errors = {};
  data.aim = !isEmpty(data.aim) ? data.aim : "";
  data.issue = !isEmpty(data.issue) ? data.issue : "";
  data.expected_outcome = !isEmpty(data.expected_outcome)
    ? data.expected_outcome
    : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  if (Validator.isEmpty(data.aim)) {
    errors.aim = "Aim cannot be empty";
  }

  if (Validator.isEmpty(data.issue)) {
    errors.issue = "issue is required";
  }

  if (Validator.isEmpty(data.expected_outcome)) {
    errors.expected_outcome = "Expected outcome is required";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
