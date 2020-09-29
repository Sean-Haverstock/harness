const { Pool } = require('pg');
require('dotenv').config();

// const DB_URI = process.env.elephantsql; // comes from .env file
console.log('user', process.env.USER);
const pool = new Pool({
	host: process.env.RDS,
	port: 5432,
	user: 'postgres',
	password: process.env.DBPASS,
	database: 'harness',
});

module.exports = {
	query: (text, params, callback) => {
		console.log('executed query', text);
		return pool.query(text, params, callback);
	},
};
