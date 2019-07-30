const express = require("express");
const router = express.Router();
const passport = require("passport");
const userTypeMiddleware = require("../middlewares/user-type.middleware");
const proposalController = require("../controllers/proposal.ctrl");

router
  .use(passport.authenticate("jwt", { session: false }))
  .use(userTypeMiddleware.validateUserTypeIsProvider)
  .route("/create")
  .post(proposalController.createProposal);

router
  .use(passport.authenticate("jwt", { session: false }))
  .use(userTypeMiddleware.validateUserTypeIsProvider)
  .route("/")
  .get(proposalController.getUserProposals);

router
  .use(passport.authenticate("jwt", { session: false }))
  .use(userTypeMiddleware.validateUserTypeIsProvider)
  .route("/proposal/:id")
  .get(proposalController.getProposalById)
  .patch(proposalController.updateProposal)
  .delete(proposalController.deleteProposal);

module.exports = router;
