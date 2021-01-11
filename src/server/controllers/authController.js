const bcrypt = require('bcrypt');
const model = require('../models/model.js');

const authController = {};

authController.setStatus = async (req, res, next) => {
  const userPassport = req.user;
  console.log(req.user);
  if (userPassport) {
    res.locals.status = { isLoggedIn: true };
    res.locals.user = userPassport.username;

    next();
  } else {
    res.locals.status = { isLoggedIn: false };
    next();
  }
};

authController.register = async (req, res, next) => {
  // destructure body object
  const { username, password, email, firstName, lastName } = req.body;
  // 1) search database to see if the email has already been registered
  const emailQueryText = `SELECT * FROM users WHERE email = $1`;
  const usernameQueryText = `SELECT * FROM users WHERE username = $1`;
  try {
    // check if username exists in DB, if the rowCount on the result object is greater than 0, username already exists in DB
    const usernameResponse = await model.query(usernameQueryText, [username]);
    if (usernameResponse.rowCount) {
      return res.status(400).json([
        {
          param: 'username',
          msg: `${username} has already been registered`,
        },
      ]);
    }
    // check if email is already in DB
    const emailResponse = await model.query(emailQueryText, [email]);
    if (emailResponse.rowCount) {
      return res.status(400).json([
        {
          param: 'email',
          msg: `${email} has already been registered`,
        },
      ]);
    }
    // 2) add user if email has not already been registered
    const addUserQueryText =
      'INSERT INTO users (username, firstName, lastName, email, password) VALUES($1,$2,$3,$4,$5)';
    const hashedPass = await bcrypt.hash(password, 10);
    await model.query(addUserQueryText, [
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
