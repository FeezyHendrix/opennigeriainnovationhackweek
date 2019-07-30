const _ = require("lodash");

/**
 * Validators
 */
const validateIssues = require("../validators/issue.validator");

/**
 * Models
 */
const issuemodel = require("../models/issues.model");

/**
 * @method createNewIssue:  Controller to create a new issue
 * @returns 200 and a success message
 */

exports.createNewIssue = (req, res) => {
  const { errors, isValid } = validateIssues(req.body);

  if (!isValid) {
    return res.status(422).send(errors);
  }

  const new_issue = new issuemodel({
    title: req.body.title,
    description: req.body.description,
    criteria: req.body.criteria,
    tasks: req.body.tasks,
    objective: req.body.objective,
    user: req.user._id,
    proposals: []
  });

  issuemodel.createNewIssue(new_issue, (err, created) => {
    if (err) console.error(err);

    if (created) {
      return res.status(200).json({
        message: "Issue created succesfully"
      });
    } else {
      return res.status(422).json({
        message: "An error occcured while creating issue"
      });
    }
  });
};

/**
 *@method editIssues Edit an issue by a given id
 *@returns 200 with a success messge
 */
exports.editIssue = (req, res) => {
  const issue_id = req.params.id;
  const update = req.body;

  issuemodel.editIssue(issue_id, update, (err, updated) => {
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
 * @method getUserIssues: Get a user issues
 * @returns 200 with all user issues paginated
 */

exports.getUserIssues = (req, res) => {
  const page = req.query.page;
  const user_id = req.user._id;

  issuemodel.paginate(
    { user: user_id, is_deleted: false },
    { page: page, limit: 20, select: "-proposals -is_deleted -fund" },
    (err, issues) => {
      if (err) console.error(err);

      if (issues) {
        return res.status(200).send(issues);
      } else {
        return res.status(422).json({
          message: "An error occured"
        });
      }
    }
  );
};

/**
 * @method getIssue: return a particular issue from id
 * @returns 200 with issue object
 */

exports.getIssue = (req, res) => {
  const issue_id = req.params.id;

  issuemodel.getIssue(issue_id, (err, issue) => {
    if (err) console.error(err);

    return res.status(200).send(issue);
  });
};

/**
 * @method deleteIssue: soft delete a particular issue
 * @returns 200 if deleted with a success message
 */

exports.deleteIssue = (req, res) => {
  const issue_id = req.params.id;

  issuemodel.deleteIssue(issue_id, (err, success) => {
    if (err) console.error(err);

    if (success) {
      return res.status(200).json({
        message: "Deleted succesfully"
      });
    } else {
      return res.status(422).json({
        message: "An error occured!"
      });
    }
  });
};
