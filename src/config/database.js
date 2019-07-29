const mongoose = require("mongoose");

/**
 * @method :  initializeDatabase
 * @returns: Promise : connected || error
 */
exports.initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const database =
      process.env.MONGODB_URI || "mongodb://localhost:27017/opin";

    mongoose.connect(database, {
      useCreateIndex: true,
      useNewUrlParser: true
    });

    mongoose.connection.on("connected", () => {
      console.log(`Connected to the database ${database}`);
      resolve();
    });

    mongoose.connection.on("error", () => {
      console.log(`Error connection to the database`);
      reject();
    });
  });
};
