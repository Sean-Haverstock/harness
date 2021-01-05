const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/", passport.authenticate("local"), (req, res) => {
  res.status(200).send("User Logged In");
});

module.exports = router;
