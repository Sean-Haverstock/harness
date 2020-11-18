const express = require('express'); // call express
const bodyParser = require('body-parser');
const path = require('path');
const os = require('os');
const climbsRouter = require('./routers/climbs');

const app = express(); // define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000; // set our port

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api/climbs', climbsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
