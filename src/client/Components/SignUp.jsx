import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link as NavLink } from '@material-ui/core';
import Login from './Login';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Harness
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [isRegistered, setRegistered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [authenticated, setAuthenticated] = props;
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    username: null,
    password: null,
    email: null,
  });

  function handleInfoChange(e) {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.id]: null });
  }

  async function handleSubmit(e) {
    console.log('in here');
    e.preventDefault();
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = userInfo;

    const body = {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post('api/signup', body);
      console.log('response', response);
      setRegistered(true);
    } catch (error) {
      console.log('catch error', error.response.data);
      const errors = error.response.data;
      const obj = {};
      for (error in errors) {
        const { param } = errors[error];
        const { msg } = errors[error];
        obj[param] = msg;
      }
      console.log('validation object', obj);
      setValidationErrors(Object.assign(validationErrors, obj));

      console.log('validation error', validationErrors);
    }
  }

  const handleClose = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return isRegistered ? (
    <Container>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Login />
      </Modal>
    </Container>
  ) : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
            onChange={handleInfoChange}
            error={validationErrors.username !== null}
            helperText={validationErrors.username}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='firstName'
            label='First Name'
            name='firstName'
            autoComplete='firstName'
            autoFocus
            onChange={handleInfoChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='lastName'
            label='Last Name'
            name='lastName'
            autoComplete='lastname'
            autoFocus
            onChange={handleInfoChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleInfoChange}
            error={validationErrors.email !== null}
            helperText={validationErrors.email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleInfoChange}
            error={validationErrors.password !== null}
            helperText={validationErrors.password}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            autoComplete='current-password'
            onChange={handleInfoChange}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/login'>
                <NavLink color='inherit' underline='hover' href='/login'>
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
