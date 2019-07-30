/**
 * @method validateUserTypeIsProvider:  Validate user type is a solution provider
 * @returns : next() if user_type is correct || 422 if incorrect
 */
exports.validateUserTypeIsProvider = (req, res, next) => {
  if (req.user.user_type == "provider") {
    next();
  } else {
    return res.status(422).send("Invalid user type, user must be a provider");
  }
};

/**
 * @method validateUserTypeIsSeeker: Validate user type is a solution seeker
 * @returns: next() if user_type is corrrect ||  422 if incorrect
 */

exports.validateUserTypeIsSeeker = (req, res, next) => {
  if (req.user.user_type == "seeker") {
    next();
  } else {
    return res
      .status(422)
      .send("Invalid user type, user must be a seeker type");
  }
};
