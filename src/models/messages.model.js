const mongoose = require("mongoose");

const messages = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversations",
    required: true
  }
});

const messagesmodel = (module.exports = mongoose.model("messages", messages));

/**
 * create a new messge
 */
module.exports.createNewMessage = (message, callback) => {
  message.save(callback);
};

/**
 * get user messages
 */
