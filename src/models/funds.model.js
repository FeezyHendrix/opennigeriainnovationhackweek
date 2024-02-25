const mongoose = require("mongoose");

const funds = mongoose.Schema({
  paid_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  comments: {
    type: String
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

const fundsmodel = (module.exports = mongoose.model("funds", funds));

/**
 * Create new fund
 */

module.exports.newFund = (fund, callback) => {
  fund.save(callback);
};
