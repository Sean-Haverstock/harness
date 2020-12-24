const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/', authController.register, (req, res) => {
	console.log('in signUp router');
	res.status(200).send('register success');
	// res.redirect('/')
});

module.exports = router;
