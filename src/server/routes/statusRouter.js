const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.get('/', authController.setStatus, (req, res) => {
  res.status(200).send([res.locals.status, res.locals.user]);
});

module.exports = router;
