const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const users = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    default: null
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    enum: ["provider", "seeker"],
    required: true
  },
  is_deleted: {
    type: Boolean
  },
  company_name: {
    type: String,
    default: null
  },
  company_address: {
    type: String,
    default: null
  },
  avatar_url: {
    type: String,
    default: null
  },
  is_activated: {
    type: Boolean,
    default: false
  },
  has_company: {
    type: Boolean,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const usermodel = (module.exports = mongoose.model("users", users));

/** Find User By ID */
module.exports.findUserById = (id, callback) => {
  usermodel.findById(id, callback);
};

/**
 * Find user by email
 */
module.exports.findUserByEmail = (email, callback) => {
  const query = { email: email };
  usermodel.findOne(query, callback);
};

/**
 * Create new user
 */

module.exports.createNewUser = async (user, callback) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    user.save(callback);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Update user
 */
module.exports.updateUser = (id, update, callback) => {
  usermodel.findByIdAndUpdate(id, update, callback);
};

/** Delete user */
module.exports.deleteUser = (id, callback) => {
  try {
    usermodel.findByIdAndUpdate(id, { is_deleted: true }, callback);
  } catch (e) {}
};
