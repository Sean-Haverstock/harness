import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './Landing';
import Navbar from './Navbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { url } from 'inspector';
import Search from './Search';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Login from './Login';
import Map from './Map';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		nav: {
			background: 'black',
			height: 500,
			width: 500,
			margin: 'auto',
			padding: 20,
		},
	})
);

const App = () => {
	const classes = useStyles();

	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/map" component={Map} />
					<Route exact path="/slider" component={Search} />/
				</Switch>
			</div>
		</Router>
	);
};

export default App;
