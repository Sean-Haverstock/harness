const db = require('../models/model');

const climbsController = {};

climbsController.getClimbs = (req, res, next) => {
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
    res.locals.routes = results.rows;
    return next();
  });
};

climbsController.searchClimbs = (req, res, next) => {
  const { type, grade, name } = req.query;
  let queryText;
  // open search
  // no name, any type and any grade
  if (name === '' && type === 'Any' && grade === 'Any') {
    queryText = `SELECT * FROM routes LIMIT 50;`;
  }
  // search by type and grade
  // no name, type inc, grade inc
  if (name === '' && type !== 'Any' && grade !== 'Any') {
    queryText = `SELECT * FROM routes WHERE type = '${type}' AND rating = '${grade}' LIMIT 50;`;
  }
  // seach by type
  // no name, type inc, any grade
  if (name === '' && type !== 'Any' && grade === 'Any') {
    queryText = `SELECT * FROM routes WHERE type = '${type}' LIMIT 50;`;
  }
  // search by grade
  // no name, any type, grade inc
  if (name === '' && type === 'Any' && grade !== 'Any') {
    queryText = `SELECT * FROM routes WHERE rating = '${grade}' LIMIT 50;`;
  }
  // seach by name
  // name inc, any type, any grade
  if (name !== '' && type === 'Any' && grade === 'Any') {
    queryText = `SELECT * FROM routes WHERE name ~* '${name}' LIMIT 50;`;
  }
  // search by name, type and grade
  // name, type, grade
  if (name !== '' && type !== 'Any' && grade !== 'Any') {
    queryText = `SELECT * FROM routes WHERE name ~* '${name}' AND type = '${type}' AND rating = '${grade}';`;
  }
  // search by name and grade
  // name, any type, grade
  if (name !== '' && type === 'Any' && grade !== 'Any') {
    queryText = `SELECT * FROM routes WHERE name ~* '${name}' AND rating = '${grade}';`;
  }
  // search by name and type
  // name, type, any grade
  if (name !== '' && type !== 'Any' && grade === 'Any') {
    queryText = `SELECT * FROM routes WHERE name ~* '${name}' AND type = '${type}';`;
  }
  db.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getClimbs middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    res.locals.routes = results.rows;
    return next();
  });
};

module.exports = climbsController;
