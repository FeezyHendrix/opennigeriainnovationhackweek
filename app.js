/** Imports */
require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const database = require("./src/config/database");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require("helmet");
const morgan = require("morgan");

/** App initialization */
const app = express();
global.__basedir = __dirname;

/** Middlewares */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(morgan("tiny"));

/** Passport strategy */
require("./src/config/passport")(passport);

/** Initializing database */
database.initializeDatabase();

/** Routes */
const userRouter = require("./src/routes/users.route");
const issuesRouter = require("./src/routes/issues.route");
const proposalRouter = require("./src/routes/proposal.route");
/** Serving Frontend public files */
// app.use(express.static(path.join(__dirname, "../public")));

// app.get('/*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/issues", issuesRouter);
app.use("/api/v1/proposals", proposalRouter);

module.exports = app;
