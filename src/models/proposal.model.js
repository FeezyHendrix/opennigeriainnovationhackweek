const mongoose = require("mongoose");

const proposals = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  aim: {
    type: String,
    required: true
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "issues",
    required: true
  },
  expected_outcome: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  is_deleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: [
      "draft",
      "submitted",
      -"passed",
      "failed",
      "negotiating",
      "accepted",
      "rejected"
    ]
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

const proposalsmodel = (module.exports = mongoose.model(
  "proposals",
  proposals
));

/**
 * create proposal
 */

module.exports.createProposal = (proposal, callback) => {
  proposal.save(callback);
};

/**
 *  Updated proposal
 */

module.exports.updateProposal = (id, update, callback) => {
  proposalsmodel.findByIdAndUpdate(id, update, callback);
};

/**
 * Get all user proposals
 */
module.exports.getUserProposals = (user_id, callback) => {
  proposalsmodel
    .find({ user: user_id, is_deleted: false })
    .populate("issue")
    .exec(callback);
};

/**
 * Get a particular proposal
 */
module.exports.getProposalById = (id, callback) => {
  proposalsmodel.findById(id, callback);
};

/**
 * Delete Proposal
 */
module.exports.deleteProposal = (id, callback) => {
  proposalsmodel.findByIdAndUpdate(id, { is_deleted: true }, callback);
};
