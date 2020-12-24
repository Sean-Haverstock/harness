const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressSession = require('express-session')({
// 	secret: 'secret',
// 	resave: false,
// 	saveUninitialized: false,
// });
// const initializePassport = require('./passport');
// const passport = require('passport');
// initializePassport(passport);
const climbsRouter = require('./routers/climbsRouter');
const signupRouter = require('./routers/signupRouter');

const app = express();
// define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressSession);

const PORT = 3000; // set our port
console.log('server.js');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api/signup', signupRouter);
app.use('/api/climbs', climbsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
