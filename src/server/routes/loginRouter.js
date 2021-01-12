const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log('info', info);
    if (err) {
      return res.redirect('/');
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(req.body.user);
    });
  })(req, res, next);
});

module.exports = router;
