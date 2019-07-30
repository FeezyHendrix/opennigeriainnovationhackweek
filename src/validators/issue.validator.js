const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateIssue(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.criteria = !isEmpty(data.criteria) ? data.criteria : "";
  data.tasks = !isEmpty(data.tasks) ? data.tasks : "";
  data.objective = !isEmpty(data.objective) ? data.objective : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (Validator.isEmpty(data.description)) {
      errors.description = "Description is required";
  }

  if (Validator.isEmpty(data.criteria)) {
    errors.criteria = "Criteria is required";
  }


  if(Validator.isEmpty(data.tasks)) {
    errors.tasks = "Tasks is required";
  }

 if(Validator.isEmpty(data.objective)) {
     errors.objective = "Objective is required";
 }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
