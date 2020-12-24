const express = require('express');
const climbsController = require('../controllers/climbsController');

const router = express.Router();

router.get('/', climbsController.getClimbs, (req, res) => {
	res.json(res.locals);
});

router.get('/search', climbsController.searchClimbs, (req, res) => {
	res.json(res.locals);
});

module.exports = router;
