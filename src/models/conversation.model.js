const mongoose = require("mongoose");

const conversations = mongoose.Schema({
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
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

module.exports = mongoose.model("conversations", conversations);
