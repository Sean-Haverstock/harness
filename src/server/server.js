const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressValidator = require('express-validator');
// const expressSession = require('express-session')({
// 	secret: 'secret',
// 	resave: false,
// 	saveUninitialized: false,
// });
// const initializePassport = require('./passport');
// const passport = require('passport');
// initializePassport(passport);
const climbsRouter = require('./routes/climbsRouter');
const signupRouter = require('./routes/signupRouter');

const app = express();
// define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator);
// app.use(expressSession);

const PORT = 3000; // set our port
console.log('server.js');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api/signup', signupRouter);
app.use('/api/climbs', climbsRouter);

app.use((err, req, res, next) => {
	console.log('first line of global handler', err.req);
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log('in global error handler', errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
