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
        console.log("results", results);
        let emailExists = results.rows.length > 0 ? true : false;
        if (!emailExists) {
          console.log("email does not exist");
          return done(null, false, { message: "This email is not registered" });
        }
        if (emailExists) {
          console.log("user TRUE");

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err, "bcrypt compare error");
              return done(err);
            }
            // if password matched send user body
            if (isMatch) {
              console.log("match");
              return done(null, user);
            } else {
              console.log("Incorrect Password");
              return done(null, false, {
                message: "This email is not registered",
              });
            }
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
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
