const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passport");

initializePassport(passport);

const climbsRouter = require("./routes/climbsRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const statusRouter = require("./routes/statusRouter");

const app = express();
// define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, "public")));
// Express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/climbs", climbsRouter);
app.use("/api/status", statusRouter);

app.use((err, req, res, next) => {
  console.log("first line of global handler", err.req);
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log("in global error handler", errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
