import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Navbar from './Navbar';
import Search from './Search';
import { ThemeProvider } from '@material-ui/core';
import SignIn from './Login';
import theme from '../UI/theme';
import Dashboard from './Dashboard';
import DashboardTemp from './DashboardTemp';

const App = () => {
	return (
		<Router>
			<div>
				<ThemeProvider theme={theme}>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={SignIn} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/search" component={Search} />/
					</Switch>
				</ThemeProvider>
			</div>
		</Router>
	);
};

export default App;
