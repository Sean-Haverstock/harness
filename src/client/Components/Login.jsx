import React from "react";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import { Link as NavLink } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import useForm from "./useForm";
import Input from "./Input";

function Login(props) {
  const { authStatus, setAuthStatus } = props;
  const classes = useStyles();
  const initialValues = {
    email: "",
    password: "",
  };

  const isValid = (fieldValues = values) => {
    const temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Please enter a valid email";
    if ("email" in fieldValues && temp.email === "")
      temp.email = fieldValues.email ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length >= 6
          ? ""
          : "Passwords are at least 6 characters";

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
    isValid
  );

  async function handleLogin(e) {
    e.preventDefault();
    if (isValid()) {
      const { email, password } = values;
      const body = {
        email,
        password,
      };

      try {
        const response = await axios.post("/api/login", body);
        console.log('response', response.status)
        if (response.status === 200) {
          setAuthStatus({
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return authStatus.isAuthenticated ? (
    <Redirect to='/dashboard' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <Input
            value={values.email}
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            value={values.password}
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleInputChange}
            error={errors.password}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup'>
                <NavLink color='inherit' underline='hover' href='/signup'>
                  Don't have an account? Sign Up
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
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='/'>
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Login;
