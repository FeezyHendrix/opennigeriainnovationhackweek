const express = require("express");
const router = express.Router();
const passport = require("passport");
const issueController = require("../controllers/issues.ctrl");
const userTypeMiddleware = require("../middlewares/user-type.middleware");
/**
 * Routes
 */
router
  .use(passport.authenticate("jwt", { session: false }))
  .use(userTypeMiddleware.validateUserTypeIsSeeker)
  .route("/create")
  .post(issueController.createNewIssue);

router
  .use(passport.authenticate("jwt", { session: false }))
  .use(userTypeMiddleware.validateUserTypeIsSeeker)
  .route("/")
  .get(issueController.getUserIssues);

router
  .use(passport.authenticate("jwt", { session: false }))
  .use(userTypeMiddleware.validateUserTypeIsSeeker)
  .route("/:id")
  .get(issueController.getIssue)
  .patch(issueController.editIssue)
  .delete(issueController.deleteIssue);

module.exports = router;
