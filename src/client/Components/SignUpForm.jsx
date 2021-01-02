import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import { BrowserRouter as Link } from "react-router-dom";
import { Link as NavLink } from "@material-ui/core";
import Login from "./Login";
import useForm from "./useForm";
import Input from "./Input";
import Success from "./Success";

export default function SignUp() {
  const classes = useStyles();
  const [isRegistered, setRegistered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [authenticated, setAuthenticated] = props;

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("username" in fieldValues)
      temp.username =
        fieldValues.username.length >= 6
          ? ""
          : "Minimum 6 characters required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Please enter a valid email";
    if ("email" in fieldValues && temp.email === "")
      temp.email = fieldValues.email ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length >= 6 ? "" : "Minimum 6 characters.";
    if ("password" in fieldValues && temp.password === "")
      temp.password =
        fieldValues.password === fieldValues.confirmPassword
          ? ""
          : "Passwords do not match.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      // if every value in the array is an empty string, there are no errors, return true
      return Object.values(temp).every((value) => value === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const {
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = values;

      const body = {
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };

      try {
        const response = await axios.post("api/signup", body);
        console.log("response", response);
        setRegistered(true);
        setModalOpen(true);
      } catch (error) {
        console.log("catch error", error.response.data);
        const serverErrors = error.response.data;
        const obj = {};
        for (error in serverErrors) {
          const { param } = serverErrors[error];
          const { msg } = serverErrors[error];
          obj[param] = msg;
        }
        console.log("validation object", obj);
        setErrors(Object.assign(errors, obj));

        // console.log("validation error", validationErrors);
      }
    }
  }

  const handleClose = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return isRegistered ? (
    <Container>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Success />
      </Modal>
    </Container>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input
            value={values.username}
            id="username"
            label="Username"
            name="username"
            onChange={handleInputChange}
            error={errors.username}
          />
          <Input
            value={values.firstName}
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Input
            value={values.lastName}
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastname"
            autoFocus
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Input
            value={values.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            value={values.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            error={errors.password}
          />
          <Input
            value={values.confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={handleInputChange}
            error={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login">
                <NavLink color="inherit" underline="hover" href="/login">
                  Already have an account? Sign In
                </NavLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Harness
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
