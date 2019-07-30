const secret_key = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const _ = require("lodash");

/**
 * Auth modules
 */
const passport = require("passport");
const jwt = require("jsonwebtoken");

/**
 * Validators
 */
const validateRegisterInput = require("../validators/register.validator");
const validateLoginInput = require("../validators/login.validator");

/**
 * Models
 */
const usermodel = require("../models/users.model");

/**
 * @method registerUser: Registering a new user and store to database.
 * @success: "Returns 200 with a jwt auth token"
 * @error: "Return 401 with error message"
 */
exports.registerUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(401).send(errors);
  }

  usermodel.findUserByEmail(req.body.email, (err, user) => {
    if (err) console.error(err);

    if (user) {
      return res.status(422).json({
        message: "Email Address already exists"
      });
    } else {
      const newuser = new usermodel({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        phone: req.body.phone || null,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_type: req.body.user_type,
        is_deleted: false,
        company_name: req.body.company_name || null,
        company_address: req.body.company_address || null,
        avatar_url: req.body.avatar_url || null,
        createdAt: Date.now()
      });
      usermodel.createNewUser(newuser, (err, created) => {
        if (err) console.error(err);

        if (created) {
          const token = jwt.sign(
            {
              data: created._id
            },
            secret_key,
            {
              expiresIn: 117200
            }
          );

          return res.status(200).json({
            token: "JWT " + token,
            message: "Registration Successful"
          });
        } else {
          return res.status(422).json({
            message: "An error occured!"
          });
        }
      });
    }
  });
};

/**
 * @method loginUser: Authenticated new user
 * @success: Returns a 200 with a jwt auth token
 * @error: Returns 400 if user is not found
 * @error: Returns 401 if invalid credentials is provided
 */

exports.loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  usermodel.findUserByEmail(email, (err, user) => {
    if (err) console.error(err);

    if (user) {
      bcrypt.compare(password, user.password, (err, success) => {
        if (err)
          return res.status(401).json({ message: "Invalid Email/Password" });

        if (success) {
          const token = jwt.sign(
            {
              data: user._id
            },
            secret_key,
            {
              expiresIn: 117200
            }
          );
          return res.status(200).json({
            token: "JWT " + token,
            message: "Login succesful!"
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "Invalid Email/Password"
      });
    }
  });
};

/**
 * @method checkUsername: Validate username inputted by the user
 * @success: Returns a 200 with a valid key which is a boolean;
 */

exports.checkUsername = (req, res) => {
  const username = req.params.username;

  usermodel.findOne({ username: username }, (err, user) => {
    if (err) console.error(err);

    if (user) {
      return res.status(200).json({
        valid: false
      });
    } else {
      return res.status(200).json({
        valid: true
      });
    }
  });
};

/**
 * @method updateUser: send a request along with the user token to update user
 * @success: Returns a 200 with success: true key
 * @error: Returns a 422 with error message
 */

exports.updateUser = (req, res) => {
  const user_id = req.user._id;
  const update = req.body.update;

  usermodel.findByIdAndUpdate(user_id, update, (err, updated) => {
    if (err) console.error(err);

    if (updated) {
      return res.status(200).json({
        sucess: true
      });
    } else {
      return res.status(422).json({
        message: "An error occured"
      });
    }
  });
};

exports.getUserProfile = (req, res) => {
  const user_id = req.user._id;

  usermodel.findById(user_id, (err, user) => {
    if (err) console.error(err);

    if (user) {
      const user_data = _.pick(user, [
        "phone",
        "first_name",
        "last_name",
        "company_name",
        "company_address",
        "username",
        "email",
        "avatar_url"
      ]);
      return res.status(200).json({
        data: user_data
      });
    } else {
      return res.status(400).json({
        message: "Invalid user id"
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  const user_id = req.user._id;

  usermodel.findByIdAndUpdate(user_id, { is_deleted: true }, (err, user) => {
    if (err) console.error(err);

    if (user) {
      return res.status(200).json({
        message: "Account Deleted"
      });
    } else {
      return res.status(422).json({
        message: "An error occured"
      });
    }
  });
};
