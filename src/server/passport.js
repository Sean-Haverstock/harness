const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const model = require("./models/model");
// to Authenticate with passport
const initialize = (passport) => {
  const autheticateUser = (email, password, done) => {
    // search for email in DB
    model.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err, "user credentials error");
          return;
        }

        // find and compare same password
        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err, "bcrypt compare error");
              return;
            }
            // if password matched send user body
            if (isMatch) {
              console.log("match");
              return done(null, user);
            }
            console.log("Incorrect Password");
            return done(null, false, { message: "Incorrect password" });
          });
        } else {
          return done(null, false, { message: "This email is not registered" });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      autheticateUser
    )
  );
  // about session with cookie
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser((email, done) => {
    model.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err, "deserializeUser error");
          return;
        }

        return done(null, results.rows[0]);
      }
    );
  });
};

module.exports = initialize;
