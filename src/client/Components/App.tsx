import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Navbar from './Navbar';
import Search from './Search';
import { ThemeProvider } from '@material-ui/core';
import Login from './Login';
import MapPage from './LocationMap';
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
