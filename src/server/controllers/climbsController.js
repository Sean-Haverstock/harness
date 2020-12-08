const db = require('../model/model');

const climbsController = {};

climbsController.getClimbs = (req, res, next) => {
	console.log('in climb controller');
	console.log('query', req.query);
	console.log('request', req);
	const queryText = 'SELECT * FROM routes LIMIT 100;';

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

climbsController.searchClimbs = (req, res, next) => {
	console.log('in search climbs');
	console.log('query', req.query);
	// console.log('request', req);
	const { type, grade } = req.query;
	console.log(typeof type, grade);
	const queryText = `SELECT * FROM routes WHERE rating = '${grade}' AND type = '${type}' LIMIT 100;`;

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
