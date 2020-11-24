const db = require('../model/model');

const climbsController = {};

climbsController.getClimbs = (req, res, next) => {
	console.log('in climb controller');
	const queryText = 'SELECT * FROM routes LIMIT 20;';

	db.query(queryText, (err, results) => {
		if (err) {
			console.log(err);
			return next({
				log: `error occurred at getClimbs middleware. error message is: ${err}`,
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
		console.log('results', results.rows);
		res.locals.routes = results.rows;
		return next();
	});
};

module.exports = climbsController;
