import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './Landing';
import Navbar from './Navbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { url } from 'inspector';
import Search from './Search';
import { Container, ThemeProvider } from '@material-ui/core';
import Login from './Login';
import MapPage from './LocationMap';
import AppBar from '@material-ui/core/AppBar';
import theme from '../UI/theme';

const App = () => {
	return (
		<Router>
			<div>
				<ThemeProvider theme={theme}>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/map" component={MapPage} />
						<Route exact path="/search" component={Search} />/
					</Switch>
				</ThemeProvider>
			</div>
		</Router>
	);
};

export default App;
