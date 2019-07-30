const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const issues = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  criteria: {
    type: String,
    required: true
  },
  tasks: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  proposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "proposals"
    }
  ],
  is_deleted: {
    type: Boolean,
    default: false
  },
  fund: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "funds",
      default: null
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Apply mongoose paginate plugin
 */
issues.plugin(mongoosePaginate);

const issuemodel = (module.exports = mongoose.model("issues", issues));

/**
 * Create a issue
 */

module.exports.createNewIssue = (issue, callback) => {
  issue.save(callback);
};

/**
 * Edit issue
 */
module.exports.editIssue = (id, update, callback) => {
  issuemodel.findByIdAndUpdate(id, update, callback);
};

/**
 * Get all user Issues
 */
module.exports.getUserIssues = (id, callback) => {
  issuemodel.find({ user: id, is_deleted: false }, callback);
};

/**
 * Get a particular issue
 */
module.exports.getIssue = (id, callback) => {
  issuemodel
    .find({ user: id, is_deleted: false })
    .populate("proposals")
    .exec(callback);
};

/**
 * Delete an issue
 */
module.exports.deleteIssue = (id, callback) => {
  issuemodel.findByIdAndUpdate(id, { is_deleted: true }, callback);
};
