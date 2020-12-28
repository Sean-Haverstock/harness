const express = require('express');
const authController = require('../controllers/authController.js');
const validateUser = require('../userValidator');
const router = express.Router();

router.post('/', validateUser.add, authController.register, (req, res) => {
	console.log('in signUp router');
	res.status(200).send('Registration Success');
});

module.exports = router;
