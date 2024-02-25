const proposalmodel = require("../models/proposal.model");
const proposalValidator = require("../validators/proposal.validator");

/**
 * @method  createProposal: Controller to create a proposal
 * @returns: returns a 200 when sucessful
 */

exports.createProposal = (req, res) => {
  const { errors, isValid } = proposalValidator(req.body);

  if (!isValid) {
    return res.status(422).send(errors);
  }

  const new_proposal = new proposalmodel({
    user: req.user._id,
    aim: req.body.aim,
    issue: req.body.issue,
    expected_outcome: req.body.expected_outcome,
    content: req.body.content,
    is_deleted: false,
    status: "draft"
  });

  proposalmodel.createProposal(new_proposal, (err, created) => {
    if (err) console.error(err);

    if (created) {
      return res.status(200).json({
        message: "Proposal created succesfully"
      });
    } else {
      return res.status(422).json({
        message: "An error occured"
      });
    }
  });
};

/**
 * @method updateProposal
 * @returns return a 200 when sucessful
 */
exports.updateProposal = (req, res) => {
  const proposal_id = req.params.id;
  const update = req.body;

  proposalmodel.updateProposal(proposal_id, update, (err, updated) => {
    if (err) console.error(err);

    if (updated) {
      return res.status(200).json({
        message: "Updated succesfully"
      });
    } else {
      return res.status(422).json({
        message: "An error occured"
      });
    }
  });
};

/**
 * @method getProposalById
 * @returns  return a 200 when succesful
 */
exports.getProposalById = (req, res) => {
  const proposal_id = req.params.id;

  proposalmodel.getProposalById(proposal_id, (err, proposal) => {
    if (err) console.error(err);

    if (proposal) {
      return res.status(200).json({
        message: "Updated successfully"
      });
    } else {
      return res.status(422).json({
        message: "An error occured"
      });
    }
  });
};

/**
 * @method getUserProposals
 * @returns return a 200 when successful
 */
exports.getUserProposals = (req, res) => {
  const user_id = req.user._id;
  const page = req.query.page;

  proposalmodel.getUserProposals(page, user_id, (err, proposals) => {
    if (err) console.error(err);

    if (proposals) {
      return res.status(200).send(proposals);
    }
  });
};

/**
 * @method deleteProposal
 * @returns return 200 when delete is succesful
 */
exports.deleteProposal = (req, res) => {
  const id = req.params.id;

  proposalmodel.deleteProposal(id, (err, deleted) => {
    if (err) console.error(err);

    if (deleted) {
      return res.status(200).json({
        message: "Deleted succesfully"
      });
    } else {
      return res.status(422).json({
        message: "An error occured"
      });
    }
  });
};
