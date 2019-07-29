const userController = require("../controllers/users.ctrl");
const express = require("express");
const router = express.Router();
const passport = require("passport");

/** Routes */
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/check_username/:username", userController.checkUsername);

router
  .use(passport.authenticate("jwt", { session: false }))
  .patch("/user", userController.updateUser)
  .get("/user", userController.getUserProfile);
module.exports = router;
