const bcrypt = require('bcrypt');
const model = require('../Models/model.js');

const authController = {};

authController.register = async (req, res, next) => {
	console.log('in authController', 'body', req.body);
	const { username, password, email, firstName, lastName } = req.body;
	const queryText =
		'INSERT INTO users (username, firstName, lastName, email, password) VALUES($1,$2,$3,$4,$5)';
	const hashedPass = await bcrypt.hash(password, 10);
	try {
		await model.query(queryText, [
			username,
			firstName,
			lastName,
			email,
			hashedPass,
		]);
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: `error occurred at register middleware. error message is: ${err}`,
			status: 400,
			message: { err: 'An error occurred' },
		});
	}
};

module.exports = authController;
