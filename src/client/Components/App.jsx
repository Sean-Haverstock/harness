import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core';
import Landing from './Landing';
import Navbar from './Navbar';
import Search from './Search';
import Login from './Login';
import theme from '../UI/theme';
import Dashboard from './Dashboard';
import MobileNav from './MobileNav';
import SignUpForm from './SignUpForm';

export const AuthContext = createContext();

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    email: '',
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await axios.get('/api/status');
        setAuthStatus({
          isAuthenticated: result.data[0].isLoggedIn,
          email: result.data[1],
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <Router>
      <>
        <AuthContext.Provider value={[authStatus, setAuthStatus]}>
          <ThemeProvider theme={theme}>
            {width < breakpoint ? <MobileNav /> : <Navbar />}
            <Switch>
              <Route
                exact
                path='/'
                render={() => <Landing authStatus={authStatus} />}
              />
              <Route
                exact
                path='/login'
                render={() => (
                  <Login
                    authStatus={authStatus}
                    setAuthStatus={setAuthStatus}
                  />
                )}
              />
              <Route
                exact
                path='/signup'
                render={() => (
                  <SignUpForm
                  // authStatus={authStatus}
                  // setAuthStatus={setAuthStatus}
                  />
                )}
              />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route
                exact
                path='/search'
                render={() => (
                  <Search
                    authStatus={authStatus}
                    setAuthStatus={setAuthStatus}
                  />
                )}
              />
            </Switch>
          </ThemeProvider>
        </AuthContext.Provider>
      </>
    </Router>
  );
};

export default App;
