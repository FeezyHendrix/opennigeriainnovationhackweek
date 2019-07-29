/** Imports */
const express = require("express");
const path = require("path");
const logger = require("morgan");
const database = require("./src/config/database");

/** App initialization */
const app = express();
global.__basedir = __dirname;

/** Middlewares */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(morgan("tiny"));

/** Initializing database */
database.initializeDatabase();

/** Serving Frontend public files */
// app.use(express.static(path.join(__dirname, "../public")));

// app.get('/*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.use("/", indexRouter);

module.exports = app;
